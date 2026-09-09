import { replayed } from "@akasha/changes/change-answer"
import type { FileChange } from "@akasha/changes/change-answer/types"
import { bodyIn, droppedAll, editsIn, keptEdits } from "@akasha/changes/edits-keeping"
import { handedPageOf, handedUnder } from "@akasha/changes/subagent-handed"
import { mistaking } from "../asking/asking.module.code.ts"
import type { Answer } from "../calling/calling.module.code.ts"
import type { Piping } from "../piping/piping.module.code.ts"
import { offRepo, pathAt } from "../said-pathing/said-pathing.module.code.ts"

export const NO_PAGE = "this call names no agent whose page the edits would be kept beside"

const DROPPED = "these edits are gone, and no apply lands them"

const NOTHING_KEPT = "no edits are kept beside this agent's page, so nothing went"

const STILL_KEPT = "edit(s) are still kept beside this agent's page"

const STILL_HANDED = "edit(s) are still handed over by this subagent"

const NONE_HANDED = "no subagent has handed edits to this agent"

const HANDED_NONE = "has handed no edits to this agent"

const NOTHING_HELD = "no edits are kept beside this agent's page"

const KEPT_LANDS = "`akasha change apply` lands these"

const NO_SUBAGENT = "this call names no subagent whose handed edits would be reached"

const HANDED_LANDS = "`akasha change take <subagent>` takes one of these into this agent's own"

const HELD_BACK = "the handed edits are kept as they were, and this agent's own are unchanged"

const TAKEN = "these edits are this agent's own now, and `akasha change apply` lands them"

export function saidOf(one: FileChange): string {
  if (one.kind === "move") return `moves ${one.pathFrom} to ${one.pathTo}`
  if (one.kind === "remove") return `takes ${one.path} away`
  if (one.kind === "add") return `adds ${one.path}`
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

const HANDED_OVER = "every edit that subagent handed over"

const HANDED_NAMES_NONE = "names no edit this subagent handed over"

export const DROP_WORDS = wording({
  said: "drop",
  every: "takes every edit away",
  all: "takes away every edit kept",
  toDo: "take away every edit kept",
  missing: "names no edit kept beside this agent's page, so nothing went",
})

const TAKE_WORDS = wording({
  said: "take",
  every: `takes ${HANDED_OVER}`,
  all: `takes ${HANDED_OVER}`,
  toDo: `take ${HANDED_OVER}`,
  missing: `${HANDED_NAMES_NONE}, so nothing was taken`,
})

const FORGET_WORDS = wording({
  said: "forget",
  every: `takes away ${HANDED_OVER}`,
  all: `takes away ${HANDED_OVER}`,
  toDo: `take away ${HANDED_OVER}`,
  missing: `${HANDED_NAMES_NONE}, so nothing went`,
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
  let answer: Answer = { report: [NOTHING_KEPT], refusals: [], code: 0 }
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
    answer = { report: [...went.map(saidOf).sort(), DROPPED, ...left], refusals: [], code: 0 }
    return bare ? null : had.filter((one) => !namedIn(one, at))
  })
  if ("why" in dropped) return { report: [], refusals: [dropped.why], code: 3 }
  return answer
}

export function waitingSaid(root: string, page: string): readonly string[] {
  const many = handedUnder(root, page).length
  if (many === 0) return []
  return [`${String(many)} subagent(s) handed edits over, which \`akasha change list\` names`]
}

function heldFor(root: string, page: string, under: string): string | null {
  return handedUnder(root, page).includes(under) ? handedPageOf(under) : null
}

function handedSaid(root: string, page: string): readonly string[] {
  const under = handedUnder(root, page)
  if (under.length === 0) return []
  const said = under.map((one) => {
    const held = editsIn(root, handedPageOf(one))
    return `${one} handed ${String("why" in held ? 0 : held.rows.length)} edit(s) over`
  })
  return [...said, HANDED_LANDS]
}

export function listing(root: string, page: string): Answer {
  const said = handedSaid(root, page)
  if (said.length === 0) return { report: [NONE_HANDED], refusals: [], code: 0 }
  return { report: said, refusals: [], code: 0 }
}

export function listingKept(root: string, page: string): Answer {
  const held = editsIn(root, page)
  if ("why" in held) return { report: [], refusals: [held.why], code: 3 }
  const own =
    held.rows.length === 0 ? [NOTHING_HELD] : [...held.rows.map(saidOf).sort(), KEPT_LANDS]
  return { report: [...own, ...handedSaid(root, page)], refusals: [], code: 0 }
}

export function listingHanded(root: string, page: string, under: string): Answer {
  const at = heldFor(root, page, under)
  if (at === null) return { report: [`${under} ${HANDED_NONE}`], refusals: [], code: 0 }
  const held = editsIn(root, at)
  if ("why" in held) return { report: [], refusals: [held.why], code: 3 }
  if (held.rows.length === 0) return { report: [`${under} ${HANDED_NONE}`], refusals: [], code: 0 }
  return { report: [...held.rows.map(saidOf).sort(), HANDED_LANDS], refusals: [], code: 0 }
}

type Held = {
  readonly at: string
  readonly rows: readonly FileChange[]
  readonly went: readonly FileChange[]
}

function handedFor(
  root: string,
  page: string,
  under: string | undefined,
  piping: Piping,
  of: Words
): Held | Answer {
  if (under === undefined) return mistaking([NO_SUBAGENT])
  const piped = pipedPathsIn(piping, of)
  if (typeof piped === "string") return mistaking([piped])
  const at = heldFor(root, page, under)
  if (at === null) return { report: [NONE_HANDED], refusals: [], code: 0 }
  const held = editsIn(root, at)
  if ("why" in held) return { report: [], refusals: [held.why], code: 3 }
  if (held.rows.length === 0) return { report: [NONE_HANDED], refusals: [], code: 0 }
  const named = rootedAt(root, piped)
  if (typeof named === "string") return mistaking([named])
  const went = named.length === 0 ? held.rows : held.rows.filter((one) => namedIn(one, named))
  const missed = missedIn(named, went, of)
  return missed.length > 0 ? mistaking(missed) : { at, rows: held.rows, went }
}

function leftSaid(held: Held): readonly string[] {
  const left = held.rows.length - held.went.length
  return left === 0 ? [] : [`${String(left)} ${STILL_HANDED}`]
}

function sweptOf(root: string, held: Held): undefined {
  const left = held.rows.filter((one) => !held.went.includes(one))
  if (left.length === 0) return droppedAll(root, held.at)
  keptEdits(root, held.at, () => left)
}

export function taking(
  root: string,
  page: string,
  under: string | undefined,
  piping: Piping
): Answer {
  const held = handedFor(root, page, under, piping, TAKE_WORDS)
  if (!("went" in held)) return held
  const went = held.went
  let answer: Answer = mistaking([NO_PAGE])
  const kept = keptEdits(root, page, (had) => {
    const after = replayed({ edits: [...had, ...went], refused: null }, bodyIn(root))
    if ("refused" in after) {
      answer = { report: [], refusals: [after.refused, HELD_BACK], code: 3 }
      return had
    }
    const said = [...went.map(saidOf).sort(), TAKEN, ...leftSaid(held)]
    answer = { report: said, refusals: [], code: 0 }
    return [...had, ...went]
  })
  if ("why" in kept) return { report: [], refusals: [kept.why], code: 3 }
  if (answer.code === 0) sweptOf(root, held)
  return answer
}

export function forgetting(
  root: string,
  page: string,
  under: string | undefined,
  piping: Piping
): Answer {
  const held = handedFor(root, page, under, piping, FORGET_WORDS)
  if (!("went" in held)) return held
  sweptOf(root, held)
  const said = [...held.went.map(saidOf).sort(), DROPPED, ...leftSaid(held)]
  return { report: said, refusals: [], code: 0 }
}
