import { readFileSync, statSync } from "node:fs"
import {
  approvedCallOf,
  quotedIn,
} from "akasha/agent/hook/agent-hook/block-combined-akasha-calls/block-combined-akasha-calls.agent-hook.code.ts"
import { ACTING_NAMED, writerIn } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import {
  type Discard,
  discarded,
} from "akasha/command/pages/read/modules/output-reaching/output-reaching.module.code.ts"

export type Call = {
  readonly argv: readonly string[]
  readonly acting: boolean
  readonly dispatcher: string
  readonly parent: readonly string[] | null
  readonly out: Discard | null
  readonly err: Discard | null
}

const JUDGED: ReadonlySet<string> = new Set(["read", "change"])

const HELPS: ReadonlySet<string> = new Set(["--help", "-h"])

const CHANGE = "change"

const RUN = "-c"

const QUOTE = "'"

const REQUOTED = `'"'"'`

const HANDED = / && eval '((?:[^']|'"'"')*)'(?: < \/dev\/null)? && pwd -P >\| \S+$/

const EXPORTED = new RegExp(`^export ${ACTING_NAMED}='[A-Za-z0-9_-]+'\\n`)

const OUT = 1

const ERR = 2

const HOOK = "block-combined-akasha-calls"

export function handedBy(parent: readonly string[]): string | null {
  if (parent[1] !== RUN) return null
  const quoted = HANDED.exec(parent[2] ?? "")?.[1]
  if (quoted === undefined) return null
  return quoted.replaceAll(REQUOTED, QUOTE).replace(EXPORTED, "")
}

function oneFile(named: string, other: string): boolean {
  if (named === other) return true
  try {
    const one = statSync(named)
    const two = statSync(other)
    return one.dev === two.dev && one.ino === two.ino
  } catch {
    return false
  }
}

function judgedAbove(call: Call): boolean {
  const script = call.parent?.[1]
  if (script === undefined || call.parent?.[2] !== CHANGE) return false
  return oneFile(script, call.dispatcher)
}

function judged(call: Call): string | null {
  const word = call.argv[0]
  if (word === undefined || !JUDGED.has(word)) return null
  if (HELPS.has(call.argv[call.argv.length - 1] ?? "")) return null
  if (!call.acting || judgedAbove(call)) return null
  return word
}

function aloneSaid(word: string): string {
  return (
    `\`akasha ${word}\` runs for an agent only as the whole command that agent's shell was ` +
    `handed, in a form \`${HOOK}\` approves, so nothing ran. Run the call again alone on the ` +
    "line, with `akasha` named outright."
  )
}

function thrownSaid(word: string, stream: string, thrown: Discard): readonly string[] {
  return [
    `this call's ${stream} goes to ${thrown}, so nothing it says would reach you.`,
    aloneSaid(word),
  ]
}

function startedSaid(word: string, parent: readonly string[] | null): readonly string[] {
  const starter = parent?.[0]
  const by =
    starter === undefined
      ? "a process whose command line would not read"
      : `\`${starter}\`, which is no shell an agent's Bash call opens`
  return [`this call was started by ${by}.`, aloneSaid(word)]
}

function joinedSaid(word: string, handed: string): readonly string[] {
  return [
    "this call is one part of the command the shell was handed, which follows:",
    "",
    ...quotedIn(handed),
    "",
    aloneSaid(word),
  ]
}

export function refusalOf(call: Call): readonly string[] | null {
  const word = judged(call)
  if (word === null) return null
  if (call.out !== null) return thrownSaid(word, "output", call.out)
  if (call.err !== null) return thrownSaid(word, "errors", call.err)
  const handed = call.parent === null ? null : handedBy(call.parent)
  if (handed === null) return startedSaid(word, call.parent)
  return approvedCallOf(handed) === word ? null : joinedSaid(word, handed)
}

function parentNow(): readonly string[] | null {
  try {
    const held = readFileSync(`/proc/${process.ppid}/cmdline`, "utf8")
    return held.split("\0").filter((one, at, every) => one !== "" || at < every.length - 1)
  } catch {
    return null
  }
}

export function callNow(
  argv: readonly string[],
  env: Readonly<Record<string, string | undefined>>,
  dispatcher: string
): Call {
  return {
    argv,
    acting: writerIn(env) !== null,
    dispatcher,
    parent: parentNow(),
    out: discarded(OUT),
    err: discarded(ERR),
  }
}
