import { readFileSync } from "node:fs"
import { ownRepoRoot } from "@akasha/pages/checkout-roots"
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

const HELP = `supervisor-agent-settings — print the fleet's agent settings document

Prints \`seat-system/agent-settings/pages/agents/agents.agent-settings.harness-settings.json\` from this repository verbatim, as JSON on stdout, with the hooks akasha declares merged into it. A
module elsewhere in this repository imports \`agentSettings\` rather than running this, so what
this prints is for a person reading it.

Usage:
  bun seat-system/supervising/supervisor-agent-settings/supervisor-agent-settings.module.code.ts

Flags:
  --help, -h  Print this and exit 0.

Exits:
  0  the document was printed
  1  a flag was not understood
  2  the document is absent, unreadable, or is not a JSON object
`

function refuse(message: string, code: number): never {
  process.stderr.write(`${message}\n`)
  process.exit(code)
}

// What an importer asks for: the document a seat spawns on, with the hooks akasha declares
// merged in. It throws rather than answering with nothing, so a caller is the one that decides
// what nothing means for it.
export function agentSettings(): Record<string, unknown> {
  const path = SETTINGS_AT

  let raw: string
  try {
    raw = readFileSync(path, "utf8")
  } catch (cause) {
    throw new Error(
      `the agent settings document at ${path} could not be read, so nothing is answered ` +
        `about what the fleet loads: ${cause instanceof Error ? cause.message : String(cause)}`
    )
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch (cause) {
    throw new Error(
      `the agent settings document at ${path} is not readable JSON, so nothing is answered ` +
        `about what the fleet loads: ${cause instanceof Error ? cause.message : String(cause)}`
    )
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error(
      `the agent settings document at ${path} holds ${Array.isArray(parsed) ? "an array" : typeof parsed} ` +
        "at the top level, where every reader of it walks an object of keys."
    )
  }

  const document = parsed as Record<string, unknown>
  const root = ownRepoRoot()
  let derived: Record<string, HookRegistration[]>
  try {
    derived = hooksFrom(root)
  } catch (cause) {
    throw new Error(
      `the agent hooks akasha states could not be read, so nothing is answered about what the ` +
        `fleet loads: ${cause instanceof Error ? cause.message : String(cause)}`
    )
  }

  return { ...document, hooks: hooksMerged(document["hooks"], derived) }
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
