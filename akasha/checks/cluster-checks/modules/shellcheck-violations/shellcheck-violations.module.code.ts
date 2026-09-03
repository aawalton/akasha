import { z } from "zod"

export interface ShellcheckViolation {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly code: number
  readonly level: string
  readonly message: string
}

export const SHELLCHECK_ARGV: readonly string[] = [
  "shellcheck",
  "-x",
  "--source-path=SCRIPTDIR",
  "-f",
  "json1",
]

const wikiUrl = (code: number): string => `https://www.shellcheck.net/wiki/SC${code}`

export const formatShellcheckViolation = (violation: ShellcheckViolation): string =>
  `${violation.file}:${violation.line}:${violation.column} SC${violation.code} (${violation.level}): ${violation.message} — ${wikiUrl(violation.code)}`

const JUDGING_EXIT_CODES: ReadonlySet<number> = new Set([0, 1])

interface Json1Comment {
  readonly file?: unknown
  readonly line?: unknown
  readonly column?: unknown
  readonly code?: unknown
  readonly level?: unknown
  readonly message?: unknown
}

const asNumber = (value: unknown, field: string): number => {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`shellcheck json1 comment has no usable \`${field}\``)
  }
  return value
}

const asString = (value: unknown, field: string): string => {
  if (typeof value !== "string") {
    throw new Error(`shellcheck json1 comment has no usable \`${field}\``)
  }
  return value
}

const Json1OutputSchema = z.object({ comments: z.array(z.custom<Json1Comment>()) })

export function readShellcheckRun(args: {
  readonly file: string
  readonly exitCode: number | null
  readonly stdout: string
  readonly stderr: string
}): readonly ShellcheckViolation[] {
  if (args.exitCode === null || !JUDGING_EXIT_CODES.has(args.exitCode)) {
    const detail = args.stderr.trim() === "" ? args.stdout.trim() : args.stderr.trim()
    const how = args.exitCode === null ? "died on a signal" : `exited ${args.exitCode}`
    throw new Error(`shellcheck ${how} and judged nothing${detail === "" ? "" : `: ${detail}`}`)
  }

  let result: ReturnType<typeof Json1OutputSchema.safeParse>
  try {
    result = Json1OutputSchema.safeParse(JSON.parse(args.stdout))
  } catch (err) {
    const why = err instanceof Error ? err.message : String(err)
    throw new Error(`shellcheck exited ${args.exitCode} and its json1 output did not parse: ${why}`)
  }
  if (!result.success) {
    throw new Error("shellcheck json1 output carries no `comments` array")
  }
  const { comments } = result.data

  if (args.exitCode === 1 && comments.length === 0) {
    throw new Error("shellcheck exited 1 for findings and then reported none")
  }
  if (args.exitCode === 0 && comments.length > 0) {
    throw new Error(`shellcheck exited 0 for clean and then reported ${comments.length} comment(s)`)
  }

  return comments.map((raw: Json1Comment): ShellcheckViolation => {
    return {
      file: args.file,
      line: asNumber(raw.line, "line"),
      column: asNumber(raw.column, "column"),
      code: asNumber(raw.code, "code"),
      level: asString(raw.level, "level"),
      message: asString(raw.message, "message"),
    }
  })
}
