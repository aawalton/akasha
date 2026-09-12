import { join } from "node:path"
import {
  editsIn,
  editsWaiting,
  sweptAll,
} from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { atMostIn } from "akasha/changes/modules/value-carrying/value-carrying.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { change } from "akasha/commands/arguments/pages/change.argument.ts"
import {
  answering,
  DATA,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { readingIn } from "akasha/commands/modules/argument-reading/argument-reading.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { type Input, inputIn } from "akasha/commands/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { changeRepeat as page } from "akasha/commands/pages/change/repeat/change-repeat.command.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

const CHANGE_AGENT = "change-agent"

const MODULE = "module"

const CLI = "cli"

const CODE = "code"

const TS = "ts"

const AT_MOST = "at-most"

const TAKES_AT_MOST = "takesAtMost"

const APPLIES = ["change", "apply"]

const DROPS = ["change", "drop"]

const DROPS_ALL = "all: true\n"

const DROP_FAILED = "the edits that batch left were not dropped, so no later run may land:"

const KEPT_MESSAGE =
  "message: the edits kept before this repeat began land before its first batch\n"

const KEPT_LANDED = "the edits kept beside this agent's page landed before the first batch"

const KEPT_UNREAD =
  "a row kept beside this agent's page reads as no edit, so what was kept was swept rather than" +
  " landed"

const KEPT_STALE =
  "edits are kept beside this agent's page and landing them first was refused, so no batch ran:"

const COMMITTED = "committed as "

const ONE_CHANGE = "a repeat runs one change over and over"

const NO_ARGUMENTS =
  "a repeat reads its arguments from standard input, and this call piped nothing in"

const NO_CEILING = "`at-most` says how many pages one batch acts on, and this call names none"

const NO_CLI = "no `module` is slugged `cli`, so no batch could be run"

const NOTHING_SAID = "that batch landed nothing and said nothing"

const AND_THEN = "batch(es) landed, and then:"

export type Piping = () => Input

export type Batch = {
  readonly code: number
  readonly out: readonly string[]
  readonly err: readonly string[]
}

export type Running = (argv: readonly string[], given: string) => Batch

export type Making = (root: string, at: string) => Running

export function cliAt(root: string): string | null {
  const found = listedAt(root, MODULE, CLI)[0]
  return found === undefined ? null : besideAt(found.path, CODE, TS)
}

export function takesAtMost(root: string, slug: string): boolean | null {
  const found = listedAt(root, CHANGE_AGENT, slug)[0]
  if (found === undefined) return null
  const value = valueAt(found.path, root)
  return value === null ? null : value[TAKES_AT_MOST] === true
}

export function lined(said: string | null): readonly string[] {
  if (said === null || said === "") return []
  const held = said.replace(/\n+$/, "")
  return held === "" ? [] : held.split("\n")
}

export function runningIn(root: string, at: string): Running {
  return (argv, given) => {
    const done = ran([process.execPath, join(root, at), ...argv], {
      cwd: root,
      env: { ...process.env, AKASHA_ROOT: root },
      stdin: new TextEncoder().encode(given),
    })
    return { code: done.code, out: lined(done.out), err: lined(done.err) }
  }
}

export function committedIn(out: readonly string[]): string | null {
  const found = out.find((one) => one.startsWith(COMMITTED))
  return found === undefined ? null : found.slice(COMMITTED.length)
}

export function saidBy(batch: Batch): readonly string[] {
  if (batch.err.length > 0) return batch.err
  return batch.out.length > 0 ? batch.out : [NOTHING_SAID]
}

export function droppedBy(running: Running): readonly string[] {
  const done = running(DROPS, DROPS_ALL)
  return done.code === 0 ? [] : [DROP_FAILED, ...saidBy(done)]
}

export type Cleared = { readonly said: readonly string[] } | { readonly why: readonly string[] }

export function clearing(root: string, beside: string, running: Running): Cleared {
  const landed = running(APPLIES, KEPT_MESSAGE)
  if (landed.code === 0) {
    const commit = committedIn(landed.out)
    return { said: [commit === null ? KEPT_LANDED : `${KEPT_LANDED}, committed as ${commit}`] }
  }
  const stale = { why: [KEPT_STALE, ...saidBy(landed)] }
  if (!("why" in editsIn(root, beside))) return stale
  return sweptAll(root, beside) ? { said: [KEPT_UNREAD] } : stale
}

export function repeating(
  running: Running,
  slug: string,
  given: string,
  landed: string[] = [],
  opening: readonly string[] = []
): Answer {
  for (;;) {
    const batch = running([...APPLIES, slug], given)
    const commit = batch.code === 0 ? committedIn(batch.out) : null
    if (commit === null) {
      const why = [...saidBy(batch), ...droppedBy(running)]
      if (landed.length === 0) return refusedBy([...opening, ...why], batch.code || 1)
      const closing = `${String(landed.length)} ${AND_THEN}`
      return told([...opening, ...landed, closing, ...why])
    }
    landed.push(`batch ${String(landed.length + 1)} committed as ${commit}`)
  }
}

export type Piped = { readonly text: string } | { readonly why: string }

export function textFrom(piping: Piping): Piped {
  const held = piping()
  if ("tty" in held) return { why: NO_ARGUMENTS }
  if ("unreadable" in held) return { why: `the arguments would not open: ${held.unreadable}` }
  if (held.bytes.byteLength === 0) return { why: NO_ARGUMENTS }
  return { text: new TextDecoder().decode(held.bytes) }
}

export function noBatching(slug: string): string {
  return (
    `\`${slug}\` states no \`takes-at-most\`, so one run of it acts on every page it reaches` +
    " and there is nothing to repeat"
  )
}

export async function changeRepeat(
  argv: readonly string[],
  given: Given,
  piping: Piping = inputIn,
  making: Making = runningIn
): Promise<Answer> {
  const named = takenFor(argv, given.calledAs, page, [change])
  if ("refused" in named) return mistaking([...named.refused, ONE_CHANGE])
  const slug = named.taken.change
  const piped = textFrom(piping)
  if ("why" in piped) return mistaking([piped.why])
  const read = readingIn(piped.text)
  if ("refused" in read) return mistaking([read.refused])
  const atMost = atMostIn(read.given[AT_MOST])
  if (typeof atMost === "string") return mistaking([atMost])
  if (atMost === null) return mistaking([NO_CEILING])
  const takes = takesAtMost(given.root, slug)
  if (takes === null) return mistaking([`\`${slug}\` names no change`])
  if (!takes) return mistaking([noBatching(slug)])
  const at = cliAt(given.root)
  if (at === null) return mistaking([NO_CLI])
  const agentPage = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  return await answering((done) => {
    const running = making(given.root, at)
    if (agentPage === null || !editsWaiting(given.root, agentPage)) {
      return repeating(running, slug, piped.text, done)
    }
    const cleared = clearing(given.root, agentPage, running)
    if ("why" in cleared) return refusedBy(cleared.why, DATA)
    return repeating(running, slug, piped.text, done, cleared.said)
  })
}
