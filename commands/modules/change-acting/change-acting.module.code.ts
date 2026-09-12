import { leftAt, replayed } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  bodyIn,
  editsIn,
  keptEdits,
  sweptAll,
} from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  DATA,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import type { Piping } from "akasha/commands/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { offRepo, pathAt } from "akasha/commands/modules/said-pathing/said-pathing.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { indexThere, listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { counted } from "akasha/utils/text/modules/counted/counted.module.code.ts"

export const NO_PAGE = "this call names no agent whose page the edits would be kept beside"

const PAGE_LANDING =
  "Run this same call again: nothing was kept and nothing was lost, so a try costs only the" +
  " wait, and that wait has run to minutes rather than to seconds. This call read the index" +
  " and no file on disk: the index names no page under this agent's id, and why none is named" +
  " is not something the index says. Where it is refused again," +
  " what says whether this page was ever written, and when it last went, is this repository's" +
  " own history over the page's path. A reason is in `subagent-presence.log` under this seat's" +
  " folder in the user's runtime directory, which the landing that writes a subagent's page" +
  " leaves a line in only where that landing refused, so a log naming this page nowhere says" +
  " those landings went rather than that none ran. That landing runs on" +
  " its own and the subagent does not wait for it, so it may still be queued, it may have" +
  " refused, or nothing may have started it. A landing that refused for any reason but the lock or a" +
  " put-back is retried by nothing, and a landing that ended before it could say why is" +
  " retried by nothing either. Say that you are refused to whoever dispatched" +
  " you rather than working around the refusal."

const MODULE = "module"

const PRESENCE = "subagent-presence"

const CODE = "code"

const TS = "ts"

function presenceAt(root: string): string | null {
  if (!indexThere(root)) return null
  const page = listedAt(root, MODULE, PRESENCE)[0]
  const at = page === undefined ? null : besideAt(page.path, CODE, TS)
  if (at === null) {
    throw new Error(`no \`${MODULE}\` is slugged \`${PRESENCE}\`, so no call would put a page up`)
  }
  return at
}

export function noPageSaid(root: string, agentId: string | null): string {
  if (agentId === null || presenceAt(root) === null) return NO_PAGE
  return `${NO_PAGE}. ${PAGE_LANDING}`
}

const DROPPED = "these edits are gone, and no apply lands them"

const DROPPED_UNREAD =
  "a row kept beside this agent's page reads as no edit, and `all: true` takes every edit away" +
  " without reading one"

const NOTHING_KEPT = "no edits are kept beside this agent's page, so nothing went"

const STILL_KEPT = "edit(s) are still kept beside this agent's page"

const NOTHING_HELD = "no edits are kept beside this agent's page"

const KEPT_LANDS = "`akasha change apply` lands these"

export function saidOf(one: FileChange): string {
  if (one.kind === "move") return `moves ${one.pathFrom} to ${one.pathTo}`
  if (one.kind === "remove") return `takes ${one.path} away`
  if (one.kind === "add") return `adds ${one.path}`
  if (one.kind === "append") return `puts lines at the end of ${one.path}`
  return `changes ${one.path}`
}

export type Stale = {
  readonly at: number
  readonly one: FileChange
  readonly why: string
}

export function staleIn(root: string, had: readonly FileChange[]): Stale | null {
  const bodyOf = bodyIn(root)
  for (let at = 0; at < had.length; at += 1) {
    const one = had[at]
    if (one === undefined) continue
    const held = replayed({ edits: had.slice(0, at + 1), refused: null }, bodyOf)
    if ("refused" in held) return { at, one, why: held.refused }
  }
  return null
}

const STOPS_THERE =
  "no longer fits the body it was drafted against, so the replay of the edits kept stops" +
  " there and this call keeps nothing"

const ITS_OWN_PATH =
  "the path in the line under this one is that edit's own, rather than the path this call was handed"

const HELD_BACK =
  "kept beside it are held back rather than at fault — a replay refusing anywhere lands nothing"

const DROP_NAMED =
  "a drop naming that one path takes the stale edit away and leaves every other edit kept:"

const DROP_OPENS = "  akasha change drop <<'HEREDOC'"

const DROP_SHUTS = "  HEREDOC"

const DRAFT_AGAIN =
  "then draft again against the body as it now reads. `all: true` would take every edit kept" +
  " away rather than the one that went stale."

export function stalling(root: string, had: readonly FileChange[], thrown: unknown): Answer {
  const stale = staleIn(root, had)
  if (stale === null) return refusedBy([whyOf(thrown)], OPERATIONAL)
  const rest = had.length - 1
  return refusedBy(
    [
      `edit ${String(stale.at + 1)} of the ${counted(had.length, "edit")} kept beside this` +
        ` agent's page ${STOPS_THERE}`,
      `that edit ${saidOf(stale.one)} — ${ITS_OWN_PATH}:\n  ${stale.why}`,
      ...(rest === 0 ? [] : [`the ${counted(rest, "edit")} ${HELD_BACK}`]),
      [DROP_NAMED, "", DROP_OPENS, `  at: ${leftAt(stale.one)}`, DROP_SHUTS, "", DRAFT_AGAIN].join(
        "\n"
      ),
    ],
    DATA
  )
}

function namedIn(one: FileChange, at: readonly string[]): boolean {
  if (one.kind === "move") return at.includes(one.pathTo) || at.includes(one.pathFrom)
  return at.includes(one.path)
}

const AT = "at"

const ALL = "all"

export type Words = {
  readonly line: string
  readonly names: string
  readonly piped: string
  readonly both: string
  readonly value: string
  readonly missing: string
}

function wording(one: {
  readonly said: string
  readonly every: string
  readonly all: string
  readonly toDo: string
  readonly missing: string
}): Words {
  const line = `a ${one.said} names each path on a line of its own, written \`at:\` and the path`
  const every = `a ${one.said} ${one.every} only where the lines piped in say \`all: true\``
  return {
    line,
    names: `the lines piped in name no path, and ${line}`,
    piped: `this call piped nothing in, and ${every}`,
    both: `\`all: true\` ${one.all}, and \`at\` names one, so the two together are refused`,
    value: `\`all\` takes \`true\` to ${one.toDo}, and no other value`,
    missing: one.missing,
  }
}

export const DROP_WORDS = wording({
  said: "drop",
  every: "takes every edit away",
  all: "takes away every edit kept",
  toDo: "take away every edit kept",
  missing: "names no edit kept beside this agent's page, so nothing went",
})

function pathsSaid(said: string, of: Words): readonly string[] | string {
  const held: string[] = []
  let all = false
  for (const line of said.split("\n")) {
    const one = line.trim()
    if (one === "") continue
    if (one.startsWith(`${ALL}:`)) {
      if (one.slice(ALL.length + 1).trim() !== "true") return of.value
      all = true
      continue
    }
    const path = one.startsWith(`${AT}:`) ? one.slice(AT.length + 1).trim() : ""
    if (path === "") return `\`${one}\` names no path, and ${of.line}`
    held.push(path)
  }
  if (all) return held.length === 0 ? [] : of.both
  return held.length === 0 ? of.names : held
}

export function pipedPathsIn(piping: Piping, of: Words): readonly string[] | string {
  const held = piping()
  if ("unreadable" in held && held.part === true) return held.unreadable
  if (!("bytes" in held) || held.bytes.byteLength === 0) return of.piped
  return pathsSaid(new TextDecoder().decode(held.bytes), of)
}

function rootedAt(root: string, said: readonly string[]): readonly string[] | string {
  const at: string[] = []
  for (const one of said) {
    const path = pathAt(root, one)
    if (path === null) return offRepo(one)
    at.push(path)
  }
  return at
}

function missedIn(
  at: readonly string[],
  went: readonly FileChange[],
  of: Words
): readonly string[] {
  return at
    .filter((one) => !went.some((edit) => namedIn(edit, [one])))
    .map((one) => `\`${one}\` ${of.missing}`)
}

export function dropping(root: string, page: string, said: readonly string[]): Answer {
  const at = rootedAt(root, said)
  if (typeof at === "string") return mistaking([at])
  let answer: Answer = told([NOTHING_KEPT])
  const dropped = keptEdits(root, page, (had) => {
    const bare = at.length === 0
    const went = bare ? had : had.filter((one) => namedIn(one, at))
    const missed = missedIn(at, went, DROP_WORDS)
    if (missed.length > 0) {
      answer = mistaking(missed)
      return had
    }
    if (went.length === 0) return null
    const left = bare ? [] : [`${String(had.length - went.length)} ${STILL_KEPT}`]
    answer = told([...went.map(saidOf).sort(), DROPPED, ...left])
    return bare ? null : had.filter((one) => !namedIn(one, at))
  })
  if ("why" in dropped) {
    if (at.length === 0 && sweptAll(root, page)) return told([DROPPED_UNREAD, DROPPED])
    return refusedBy([dropped.why], OPERATIONAL)
  }
  return answer
}

export function listingKept(root: string, page: string): Answer {
  const held = editsIn(root, page)
  if ("why" in held) return refusedBy([held.why], OPERATIONAL)
  const own =
    held.rows.length === 0 ? [NOTHING_HELD] : [...held.rows.map(saidOf).sort(), KEPT_LANDS]
  return told(own)
}
