import { pathsOf } from "@akasha/changes/change-answer"
import type { FileChange } from "@akasha/changes/change-answer/types"
import { droppedFirst, editsAt, foldedIn, keptEdits, linesIn } from "@akasha/changes/edits-keeping"
import { agentPathOf } from "@akasha/context/warranting"
import { costRecorded, opening } from "../../../checks/modules/check-cost/check-cost.module.code.ts"
import {
  applying,
  askedIn,
  type Carried,
} from "../../../command-system/applying/applying.module.code.ts"
import { mistaking } from "../../../command-system/asking/asking.module.code.ts"
import type { Answer, Given } from "../../../command-system/calling/calling.module.code.ts"
import { bodiesFrom } from "../../../command-system/edits-landing/edits-landing.module.code.ts"
import { inputIn, type Piping } from "../../../command-system/piping/piping.module.code.ts"
import { writtenPathsIn } from "../address-mapping/address-mapping.module.code.ts"
import {
  type Given as Arguments,
  readingIn,
} from "../argument-reading/argument-reading.module.code.ts"
import { waitingSaid } from "../change-acting/change-acting.module.code.ts"
import { APPLY, CHANGE_APPLY_PAGE } from "../change-costing/change-costing.module.code.ts"
import { noPageSaid } from "../change-running/change-running.module.code.ts"
import { allowedAgain, MEASURED_ALLOWED } from "../command-stopping/command-stopping.module.code.ts"
import { type Rebased, type Running, rebasedHeld } from "../drafting/drafting.module.code.ts"

const CHANGED: Running = { checks: true, writerOwesReading: false, readersOweReading: true }

const MEASURED_NAME = "akasha change apply"

export type Unfold = { readonly went: readonly string[] }

export type Folded =
  | {
      readonly folded: readonly string[]
      readonly dropped: readonly string[]
      readonly unfold: Unfold | null
      readonly carried: Carried | null
    }
  | { readonly refusals: readonly string[] }

export function folding(root: string, page: string): Folded {
  let answer: Folded = { folded: [], dropped: [], unfold: null, carried: null }
  const written = writtenPathsIn(root)
  const again = (one: string): boolean => written.has(one)
  const kept = keptEdits(root, page, (had) => {
    if (had.length === 0) return had
    const held = had.filter((one) => !pathsOf(one).some(again))
    const dropped = [...new Set(had.flatMap(pathsOf).filter(again))].sort()
    if (held.length === 0) {
      answer = { folded: [], dropped, unfold: null, carried: null }
      return null
    }
    const said = foldedIn(held)
    if (said.refused !== null) {
      answer = { refusals: [said.refused] }
      return had
    }
    const bodies = bodiesFrom(root, said)
    if ("why" in bodies) {
      answer = { refusals: [bodies.why] }
      return had
    }
    answer = {
      folded: [...bodies.held.keys(), ...bodies.moves.map((one) => one.to)].sort(),
      dropped,
      unfold: { went: linesIn(root, page) },
      carried: {
        held: bodies.held,
        running: CHANGED,
        moves: bodies.moves,
        formatted: bodies.formatted,
      },
    }
    return had
  })
  return "why" in kept ? { refusals: [kept.why] } : answer
}

export function rebasedRows(
  root: string,
  base: string,
  rows: readonly FileChange[]
): Rebased | { readonly why: string } {
  const said = foldedIn(rows)
  if (said.refused !== null) return { why: said.refused }
  const bodies = bodiesFrom(root, said)
  if ("why" in bodies) return bodies
  return rebasedHeld(root, base, bodies.held)
}

export function undone(root: string, page: string, unfold: Unfold, landed: boolean): string | null {
  if (landed) {
    droppedFirst(root, page, unfold.went)
    return null
  }
  return "the fold is undone — the edits are kept where the edits were, for a change to mend"
}

export type Ended = { readonly answer: Answer; readonly paths: number }

function bare(answer: Answer): Ended {
  return { answer, paths: 0 }
}

export function takenIn(piping: Piping): Arguments | string {
  const held = piping()
  if ("tty" in held) return {}
  if ("unreadable" in held) return `the arguments would not open: ${held.unreadable}`
  if (held.bytes.byteLength === 0) return {}
  const read = readingIn(new TextDecoder().decode(held.bytes))
  return "refused" in read ? read.refused : read.given
}

async function ending(taken: Arguments, given: Given): Promise<Ended> {
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) {
    return bare(mistaking([noPageSaid(given.root, given.agentId)]))
  }
  const held = keptEdits(given.root, page, (had) => had)
  if ("why" in held) return bare({ report: [], refusals: [held.why], code: 3 })
  const said = folding(given.root, page)
  if ("refusals" in said) return bare({ report: [], refusals: said.refusals, code: 3 })
  const paths = said.folded.length
  const answered = await applying(given, page, taken, said.carried)
  const put = said.unfold === null ? null : undone(given.root, page, said.unfold, answered.landed)
  if (put !== null) {
    return { answer: { report: [put], refusals: answered.refusals, code: answered.code }, paths }
  }
  return {
    answer: {
      report: [
        ...said.dropped.map(
          (one) => `${one} is dropped — that body is written again on every apply`
        ),
        ...said.folded.map((one) => `folded ${one} in`),
        ...answered.report,
        ...waitingSaid(given.root, page),
      ],
      refusals: answered.refusals,
      code: answered.code,
    },
    paths,
  }
}

export async function applyWith(taken: Arguments, given: Given): Promise<Answer> {
  const asked = askedIn(taken)
  if (!("refusals" in asked) && asked.measure) allowedAgain(MEASURED_ALLOWED, MEASURED_NAME)
  const before = opening()
  const done = await ending(taken, given)
  const refusals = done.answer.refusals.length
  costRecorded(given.root, CHANGE_APPLY_PAGE, before, APPLY, APPLY, done.paths, refusals)
  return done.answer
}

export async function applyingKept(given: Given): Promise<Answer> {
  const taken = takenIn(inputIn)
  if (typeof taken === "string") return mistaking([taken])
  return await applyWith(taken, given)
}
