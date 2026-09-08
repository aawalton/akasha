import { pathsOf } from "@akasha/changes/change-answer"
import type { Stated } from "@akasha/changes/change-answer/types"
import { droppedFirst, editsAt, foldedIn, keptEdits, linesIn } from "@akasha/changes/edits-keeping"
import { agentPathOf } from "@akasha/context/warranting"
import { costRecorded, opening } from "../../../checks/modules/check-cost/check-cost.module.code.ts"
import { writtenAgain } from "../../../command-system/address-mapping/address-mapping.module.code.ts"
import { applying, type Carried } from "../../../command-system/applying/applying.module.code.ts"
import {
  type Given as Arguments,
  readingIn,
} from "../../../command-system/argument-reading/argument-reading.module.code.ts"
import { mistaking } from "../../../command-system/asking/asking.module.code.ts"
import type { Answer, Given } from "../../../command-system/calling/calling.module.code.ts"
import { waitingSaid } from "../../../command-system/change-acting/change-acting.module.code.ts"
import {
  type Rebased,
  type Running,
  rebasedHeld,
} from "../../../command-system/drafting/drafting.module.code.ts"
import { bodiesFrom } from "../../../command-system/edits-landing/edits-landing.module.code.ts"
import { inputIn, type Piping } from "../../../command-system/piping/piping.module.code.ts"
import { APPLY, APPLY_PAGE } from "../../modules/change-costing/change-costing.module.code.ts"
import { noPageSaid } from "../change/change.command.code.ts"

const NO_FLAGS = "an apply takes its arguments piped in, and nothing on the command line"

const CHANGED: Running = { checks: true, writerOwesReading: false, readersOweReading: true }

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
  const kept = keptEdits(root, page, (had) => {
    if (had.length === 0) return had
    const held = had.filter((one) => !pathsOf(one).some(writtenAgain))
    const dropped = [...new Set(had.flatMap(pathsOf).filter(writtenAgain))].sort()
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
      folded: [...bodies.keys()].sort(),
      dropped,
      unfold: { went: linesIn(root, page) },
      carried: { held: bodies, running: CHANGED },
    }
    return had
  })
  return "why" in kept ? { refusals: [kept.why] } : answer
}

export function rebasedRows(
  root: string,
  base: string,
  rows: readonly Stated[]
): Rebased | { readonly why: string } {
  const said = foldedIn(rows)
  if (said.refused !== null) return { why: said.refused }
  const bodies = bodiesFrom(root, said)
  if ("why" in bodies) return bodies
  return rebasedHeld(root, base, bodies)
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
  const before = opening()
  const done = await ending(taken, given)
  const refusals = done.answer.refusals.length
  costRecorded(given.root, APPLY_PAGE, before, APPLY, APPLY, done.paths, refusals)
  return done.answer
}

export async function apply(argv: readonly string[], given: Given): Promise<Answer> {
  if (argv.length > 0) return mistaking([NO_FLAGS])
  const taken = takenIn(inputIn)
  if (typeof taken === "string") return mistaking([taken])
  return await applyWith(taken, given)
}
