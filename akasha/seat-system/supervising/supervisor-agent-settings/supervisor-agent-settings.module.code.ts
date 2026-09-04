import { readFileSync } from "node:fs"
import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"
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

Prints \`akasha/seat-system/agent-settings/pages/agents/agents.agent-settings.harness-settings.json\` from this repository verbatim, as JSON on stdout, with the hooks akasha declares merged into it. This is
how a module elsewhere in this repository reaches that document: it is edited here and live on
the commit, so nothing over there opens it by path.

Usage:
  bun akasha/seat-system/supervising/supervisor-agent-settings/supervisor-agent-settings.module.code.ts

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

  const path = SETTINGS_AT

  let raw: string
  try {
    raw = readFileSync(path, "utf8")
  } catch (cause) {
    refuse(
      `the agent settings document at ${path} could not be read, so nothing is answered ` +
        `about what the fleet loads: ${cause instanceof Error ? cause.message : String(cause)}`,
      EXIT_DATA
    )
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch (cause) {
    refuse(
      `the agent settings document at ${path} is not readable JSON, so nothing is answered ` +
        `about what the fleet loads: ${cause instanceof Error ? cause.message : String(cause)}`,
      EXIT_DATA
    )
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    refuse(
      `the agent settings document at ${path} holds ${Array.isArray(parsed) ? "an array" : typeof parsed} ` +
        "at the top level, where every reader of it walks an object of keys.",
      EXIT_DATA
    )
  }

  const document = parsed as Record<string, unknown>
  const root = ownRepoRoot()
  let derived: Record<string, HookRegistration[]>
  try {
    derived = hooksFrom(root)
  } catch (cause) {
    refuse(
      `the agent hooks akasha states could not be read, so nothing is answered about what the ` +
        `fleet loads: ${cause instanceof Error ? cause.message : String(cause)}`,
      EXIT_DATA
    )
  }

  process.stdout.write(
    `${JSON.stringify({ ...document, hooks: hooksMerged(document["hooks"], derived) })}\n`
  )
  return undefined
}

if (import.meta.main) main()
