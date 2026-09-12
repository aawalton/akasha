import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  editsIn,
  keptEdits,
} from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Piping } from "akasha/commands/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { offRepo, pathAt } from "akasha/commands/modules/said-pathing/said-pathing.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { indexThere, listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

export const NO_PAGE = "this call names no agent whose page the edits would be kept beside"

const PAGE_LANDING =
  "Run this same call again: nothing was kept and nothing was lost, so a try costs only the" +
  " wait, and that wait has run to minutes rather than to seconds. Where it is refused again," +
  " read `subagent-presence.log` under this seat's folder in the user's runtime directory," +
  " which is where the landing that writes the page says what happened. That landing runs on" +
  " its own and the subagent does not wait for it, so it may still be queued, it may have" +
  " refused, or nothing may have started it. Only the first of the three clears by itself, and" +
  " only that log tells them apart. A landing that refused for any reason but the lock or a" +
  " put-back is retried by nothing, and a landing that ended before it could say why is" +
  " retried by nothing either. What writes the page again is the landing that runs when this" +
  " subagent is next dispatched or resumed, so say that you are refused to whoever dispatched" +
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
  const line = `a ${one.said} names each path on a line of its own, written \`at\` and the path`
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
  if ("why" in dropped) return refusedBy([dropped.why], OPERATIONAL)
  return answer
}

export function listingKept(root: string, page: string): Answer {
  const held = editsIn(root, page)
  if ("why" in held) return refusedBy([held.why], OPERATIONAL)
  const own =
    held.rows.length === 0 ? [NOTHING_HELD] : [...held.rows.map(saidOf).sort(), KEPT_LANDS]
  return told(own)
}
