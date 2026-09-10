import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { ownRepoRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import {
  type HookRegistration,
  hooksFrom,
  hooksMerged,
} from "../agent-hook-registration/agent-hook-registration.module.code.ts"

const SETTINGS_AT = new URL(
  "../../agent-settings/pages/agents/agents.agent-settings.harness-settings.json",
  import.meta.url
).pathname

const EXIT_INPUT = 1
const EXIT_DATA = 2

const SHELL_SCRIPT = "shell-script"

const BASH_ENV_SCRIPT = "bash-env"

const STATUSLINE_SCRIPT = "statusline"

const HELP = `supervisor-agent-settings — print the fleet's agent settings document

Prints \`seat-system/agent-settings/pages/agents/agents.agent-settings.harness-settings.json\` from this repository as JSON on stdout, with the hooks akasha declares merged in, and with
\`BASH_ENV\` and \`statusLine\` resolved to the shell files the index answers for. A module
elsewhere in this repository imports \`agentSettings\` rather than running this, so what this
prints is for a person reading it.

Usage:
  bun seat-system/supervising/supervisor-agent-settings/supervisor-agent-settings.module.code.ts

Flags:
  --help, -h  Print this and exit 0.

Exits:
  0  the document was printed
  1  a flag was not understood
  2  the document, or a shell script akasha resolves for the document, could not be read
`

function refuse(message: string, code: number): never {
  process.stderr.write(`${message}\n`)
  process.exit(code)
}

export class SettingsDocumentFault extends Error {
  readonly documentFault = true
}

export function isSettingsDocumentFault(cause: unknown): boolean {
  if (cause === null || typeof cause !== "object") return false
  return (cause as { readonly documentFault?: unknown }).documentFault === true
}

function parseSettingsDocument(held: unknown, path: string): Record<string, unknown> {
  if (typeof held === "object" && held !== null && !Array.isArray(held)) {
    return held as Record<string, unknown>
  }
  throw new Error(
    `the agent settings document at ${path} holds ${Array.isArray(held) ? "an array" : typeof held} ` +
      "at the top level, where every reader of it walks an object of keys."
  )
}

function settingsDocument(raw: string, path: string): Record<string, unknown> {
  try {
    const parsed: unknown = JSON.parse(raw)
    return parseSettingsDocument(parsed, path)
  } catch (cause) {
    throw new SettingsDocumentFault(
      `the agent settings document at ${path} is not a readable JSON object, so nothing is ` +
        `answered about what the fleet loads: ${cause instanceof Error ? cause.message : String(cause)}`
    )
  }
}

function scriptAt(root: string, slug: string): string {
  const listed = listedAt(root, SHELL_SCRIPT, slug)
  const page = listed.length === 1 ? listed[0]?.path : undefined
  if (page === undefined) {
    throw new Error(
      `the index answers no one page for \`${SHELL_SCRIPT}/${slug}\`, and a seat spawns on the ` +
        "one shell file that page sits beside"
    )
  }
  const beside = besideAt(page, "shell", "sh")
  if (beside === null) {
    throw new Error(
      `\`${page}\` is the page for \`${SHELL_SCRIPT}/${slug}\`, and no shell file sits beside a ` +
        "page named that way"
    )
  }
  const at = join(root, beside)
  if (!existsSync(at)) {
    throw new Error(
      `\`${SHELL_SCRIPT}/${slug}\` names \`${beside}\`, and nothing is there for a seat to run`
    )
  }
  return at
}

function envWith(stated: unknown, bashEnv: string): Record<string, unknown> {
  const held: Record<string, unknown> =
    stated !== null && typeof stated === "object" && !Array.isArray(stated)
      ? { ...(stated as Record<string, unknown>) }
      : {}
  return { ...held, BASH_ENV: bashEnv }
}

function statusLineOn(at: string): Record<string, unknown> {
  return { type: "command", command: `bash ${at}` }
}

export function agentSettings(): Record<string, unknown> {
  const path = SETTINGS_AT

  let raw: string
  try {
    raw = readFileSync(path, "utf8")
  } catch (cause) {
    throw new SettingsDocumentFault(
      `the agent settings document at ${path} could not be read, so nothing is answered ` +
        `about what the fleet loads: ${cause instanceof Error ? cause.message : String(cause)}`
    )
  }

  const document = settingsDocument(raw, path)
  const root = ownRepoRoot()
  const bashEnvAt = scriptAt(root, BASH_ENV_SCRIPT)
  const statusLineAt = scriptAt(root, STATUSLINE_SCRIPT)
  let derived: Record<string, HookRegistration[]>
  try {
    derived = hooksFrom(root)
  } catch (cause) {
    throw new Error(
      `the agent hooks akasha states could not be read, so nothing is answered about what the ` +
        `fleet loads: ${cause instanceof Error ? cause.message : String(cause)}`
    )
  }

  return {
    ...document,
    env: envWith(document["env"], bashEnvAt),
    hooks: hooksMerged(document["hooks"], derived),
    statusLine: statusLineOn(statusLineAt),
  }
}

function main(): undefined {
  const argv = process.argv.slice(2)
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    return undefined
  }
  const stray = argv.find((arg) => arg !== "")
  if (stray !== undefined) {
    refuse(
      `\`${stray}\` is not an argument this command takes — it takes none. See --help`,
      EXIT_INPUT
    )
  }

  let document: Record<string, unknown>
  try {
    document = agentSettings()
  } catch (cause) {
    refuse(cause instanceof Error ? cause.message : String(cause), EXIT_DATA)
  }

  process.stdout.write(`${JSON.stringify(document)}\n`)
  return undefined
}

if (import.meta.main) main()
