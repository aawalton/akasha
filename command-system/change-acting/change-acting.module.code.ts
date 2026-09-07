import type { Edit } from "../../changes/modules/change-answer/change-answer.module.types.ts"
import {
  foldedIn,
  handedAway,
  handedIn,
  handedUnder,
  keptEdits,
} from "../../changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { mistaking } from "../asking/asking.module.code.ts"
import type { Answer } from "../calling/calling.module.code.ts"
import { offRepo, pathAt } from "../said-pathing/said-pathing.module.code.ts"

export const NO_PAGE = "this call names no agent whose page the edits would be kept beside"

const DROPPED = "these edits are gone, and no apply lands them"

const NOTHING_KEPT = "no edits are kept beside this agent's page, so nothing went"

const NO_KEPT_EDIT = "names no edit kept beside this agent's page, so nothing went"

const STILL_KEPT = "edit(s) are still kept beside this agent's page"

const NONE_HANDED = "no subagent has handed edits to this agent"

const NO_SUBAGENT = "this call names no subagent whose handed edits would be reached"

const HANDED_LANDS = "`akasha change take <subagent>` takes one of these into this agent's own"

const HELD_BACK = "the handed edits are kept as they were, and this agent's own are unchanged"

const TAKEN = "these edits are this agent's own now, and `akasha apply` lands them"

export function saidOf(one: Edit): string {
  const came = one.from
  if (came !== undefined && came !== one.path) return `moves ${came} to ${one.path}`
  if (one.body === null) return `takes ${one.path} away`
  if (one.was === null) return `adds ${one.path}`
  return `changes ${one.path}`
}

function namedIn(one: Edit, at: readonly string[]): boolean {
  return at.includes(one.path) || (one.from !== undefined && at.includes(one.from))
}

export function dropping(root: string, page: string, said: readonly string[]): Answer {
  const at: string[] = []
  for (const one of said) {
    const path = pathAt(root, one)
    if (path === null) return mistaking([offRepo(one)])
    at.push(path)
  }
  let answer: Answer = { report: [NOTHING_KEPT], refusals: [], code: 0 }
  const dropped = keptEdits(root, page, (had) => {
    const bare = at.length === 0
    const went = bare ? had : had.filter((one) => namedIn(one, at))
    const missed = at.filter((one) => !went.some((edit) => namedIn(edit, [one])))
    if (missed.length > 0) {
      answer = mistaking(missed.map((one) => `\`${one}\` ${NO_KEPT_EDIT}`))
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
  return [`${String(many)} subagent(s) handed edits over, which \`akasha change handed\` names`]
}

export function listing(root: string, page: string): Answer {
  const under = handedUnder(root, page)
  if (under.length === 0) return { report: [NONE_HANDED], refusals: [], code: 0 }
  const said = under.map((one) => {
    const held = handedIn(root, page, one)
    return `${one} handed ${String("why" in held ? 0 : held.rows.length)} edit(s) over`
  })
  return { report: [...said, HANDED_LANDS], refusals: [], code: 0 }
}

export function taking(root: string, page: string, under: string | undefined): Answer {
  if (under === undefined) return mistaking([NO_SUBAGENT])
  const held = handedIn(root, page, under)
  if ("why" in held) return { report: [], refusals: [held.why], code: 3 }
  if (held.rows.length === 0) return { report: [NONE_HANDED], refusals: [], code: 0 }
  let answer: Answer = mistaking([NO_PAGE])
  const kept = keptEdits(root, page, (had) => {
    const folded = foldedIn([...had, ...held.rows])
    if (folded.refused !== null) {
      answer = { report: [], refusals: [folded.refused, HELD_BACK], code: 3 }
      return had
    }
    answer = { report: [...held.rows.map(saidOf).sort(), TAKEN], refusals: [], code: 0 }
    return [...had, ...held.rows]
  })
  if ("why" in kept) return { report: [], refusals: [kept.why], code: 3 }
  if (answer.code === 0) handedAway(root, page, under)
  return answer
}

export function forgetting(root: string, page: string, under: string | undefined): Answer {
  if (under === undefined) return mistaking([NO_SUBAGENT])
  const held = handedIn(root, page, under)
  if ("why" in held) return { report: [], refusals: [held.why], code: 3 }
  if (held.rows.length === 0) return { report: [NONE_HANDED], refusals: [], code: 0 }
  handedAway(root, page, under)
  return { report: [...held.rows.map(saidOf).sort(), DROPPED], refusals: [], code: 0 }
}
