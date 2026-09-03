import { z } from "zod"
import type { Violation } from "../../../../../tools/lib/check-workflow/violation-reporter.ts"

export const SANCTIONED_PATTERN = "env -u VAR BASH_ENV= bash -c '...'"

const BASH_COMMAND = String.raw`(?<![.\w-])bash\b`

const DEPRIVING_PREFIX = String.raw`\benv\b(?:(?!${BASH_COMMAND}|BASH_ENV).)*?(?<=[\s"',[\]])(?:-u|--unset)(?=[\s"',=[\]])(?:(?!${BASH_COMMAND}|BASH_ENV).)*?`

const BASH_INVOCATION_RE = new RegExp(`${DEPRIVING_PREFIX}${BASH_COMMAND}`)

const SCRIPT_INVOCATION_RE = new RegExp(
  `${DEPRIVING_PREFIX}(?<=[\\s"'])((?:\\.{0,2}/)?[\\w.@/-]*\\.(?:sh|bash))(?=[\\s"',)\\]]|$)`
)

export type BashStartupResolver = (scriptRef: string) => boolean

export interface ScanEnvUnsetBashOptions {
  readonly readsBashStartupFile?: BashStartupResolver
}

export interface EnvUnsetBashViolation extends Violation {
  readonly kind: "env-unset-bash"
  readonly file: string
  readonly line: number
  readonly message: string
}

interface LogicalLine {
  readonly text: string
  readonly line: number
}

const COMMENT_LINE = /^\s*(?:\/\/|\/\*|\*|#)/

const UNFINISHED_LINE = /[\\[(,]$/

export function toLogicalLines(content: string): readonly LogicalLine[] {
  const physical = content.split("\n")
  const logical: LogicalLine[] = []
  let pending: string | undefined
  let startLine = 1
  const flush = (): undefined => {
    if (pending === undefined) return
    logical.push({ text: pending, line: startLine })
    pending = undefined
  }
  for (let i = 0; i < physical.length; i++) {
    const trimmed = (physical[i] ?? "").replace(/\s+$/, "")
    if (COMMENT_LINE.test(trimmed)) {
      flush()
      logical.push({ text: trimmed, line: i + 1 })
      continue
    }
    if (pending === undefined) {
      pending = trimmed
      startLine = i + 1
    } else {
      pending = `${pending} ${trimmed.replace(/^\s+/, "")}`
    }
    if (!UNFINISHED_LINE.test(trimmed)) {
      flush()
      continue
    }
    if (trimmed.endsWith("\\")) pending = pending.replace(/\\$/, "")
  }
  flush()
  return logical
}

const BASH_MESSAGE = `\`env -u\` deprivation silently undone: BASH_ENV re-sources ~/.secrets.env into the subprocess, restoring the unset var before the script runs — use \`${SANCTIONED_PATTERN}\` (empty BASH_ENV= disables the re-source for that invocation)`

function scriptMessage(scriptRef: string): string {
  return `\`env -u\` deprivation silently undone: \`${scriptRef}\` runs under a bash, which re-sources ~/.secrets.env from BASH_ENV before the script body runs, restoring the unset var — put \`BASH_ENV=\` in the same invocation (\`env -u VAR BASH_ENV= ${scriptRef}\`)`
}

const ScriptRefCaptures = z.tuple([z.string()])

function parseScriptRef(match: RegExpExecArray | null): string | null {
  if (match === null) return null
  const [scriptRef] = ScriptRefCaptures.parse(match.slice(1))
  return scriptRef
}

export function scanEnvUnsetBash(
  content: string,
  relPath: string,
  options: ScanEnvUnsetBashOptions = {}
): readonly EnvUnsetBashViolation[] {
  const violations: EnvUnsetBashViolation[] = []
  if (!content.includes("env")) return violations
  for (const { text, line } of toLogicalLines(content)) {
    if (!text.includes("env")) continue
    if (BASH_INVOCATION_RE.test(text)) {
      violations.push({ kind: "env-unset-bash", file: relPath, line, message: BASH_MESSAGE })
      continue
    }
    const scriptRef = parseScriptRef(SCRIPT_INVOCATION_RE.exec(text))
    if (scriptRef === null) continue
    if (options.readsBashStartupFile?.(scriptRef) === false) continue
    violations.push({
      kind: "env-unset-bash",
      file: relPath,
      line,
      message: scriptMessage(scriptRef),
    })
  }
  return violations
}
