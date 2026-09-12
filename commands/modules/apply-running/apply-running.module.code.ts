import { mendedFor } from "akasha/agents/hooks/links/hook-links.module.code.ts"
import { pathsOf } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  droppedFirst,
  editsAt,
  foldedIn,
  keptEdits,
  linesIn,
} from "akasha/changes/modules/edits-keeping/edits-keeping.module.code.ts"
import { costRecorded, opening } from "akasha/checks/modules/cost/check-cost.module.code.ts"
import {
  applying,
  askedIn,
  type Carried,
  pathsIn,
  type Taken,
} from "akasha/commands/modules/applying/applying.module.code.ts"
import {
  type Given as Arguments,
  readingIn,
} from "akasha/commands/modules/argument-reading/argument-reading.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { noPageSaid } from "akasha/commands/modules/change-acting/change-acting.module.code.ts"
import {
  APPLY,
  CHANGE_APPLY_SLUG,
  commandPageAt,
} from "akasha/commands/modules/change-costing/change-costing.module.code.ts"
import type { Running } from "akasha/commands/modules/change-kind-running/change-kind-running.module.code.ts"
import { landingFrom } from "akasha/commands/modules/edits-landing/edits-landing.module.code.ts"
import { inputIn, type Piping } from "akasha/commands/modules/piping/piping.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import {
  allowedAgain,
  MEASURED_ALLOWED,
} from "akasha/commands/modules/stopping/command-stopping.module.code.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"
import { headOf } from "akasha/git/head-commit/head-commit.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { everyOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const RUNNER = "change-runner"

const ADDRESSED = "addressed"

const TS = "ts"

function writtenAgainIn(root: string): ReadonlySet<string> {
  const held = new Set<string>()
  for (const listed of everyOfType(root, RUNNER)) {
    const at = besideAt(listed.path, ADDRESSED, TS)
    if (at !== null) held.add(at)
  }
  return held
}

const CHANGED: Running = { checks: true, writerOwesReading: false, readersOweReading: true }

export function runningOver(rows: readonly FileChange[]): Running {
  return { ...CHANGED, writerOwesReading: rows.some((one) => one.writerOwesReading !== false) }
}

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
  const head = headOf(root)
  const written = writtenAgainIn(root)
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
    const worked = landingFrom(root, head, said)
    if ("why" in worked) {
      answer = { refusals: [worked.why] }
      return had
    }
    answer = {
      folded: [...pathsIn(worked.rows), ...worked.moves.map((one) => one.to)].sort(),
      dropped,
      unfold: { went: linesIn(root, page) },
      carried: {
        rows: worked.rows,
        running: runningOver(held),
        moves: worked.moves,
        formatted: worked.formatted,
        owed: worked.owed,
      },
    }
    return had
  })
  return "why" in kept ? { refusals: [kept.why] } : answer
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

async function ending(asked: Taken, given: Given): Promise<Ended> {
  const page = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (page === null || editsAt(page) === null) {
    return bare(mistaking([noPageSaid(given.root, given.agentId)]))
  }
  if ("refusals" in asked) return bare(await applying(given, page, asked, null))
  const held = keptEdits(given.root, page, (had) => had)
  if ("why" in held) return bare({ report: [], refusals: [held.why], code: 3 })
  const said = folding(given.root, page)
  if ("refusals" in said) return bare({ report: [], refusals: said.refusals, code: 3 })
  const paths = said.folded.length
  const answered = await applying(given, page, asked, said.carried)
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
      ],
      refusals: answered.refusals,
      code: answered.code,
    },
    paths,
  }
}

export function mendedInto(answer: Answer, given: Given): Answer {
  const mended = mendedFor(given.root, given.calledAs)
  if (mended.length === 0) return answer
  return { ...answer, refusals: [...answer.refusals, ...mended] }
}

export async function applyWith(taken: Arguments, given: Given): Promise<Answer> {
  const asked = askedIn(taken)
  if (!("refusals" in asked) && asked.measure) allowedAgain(MEASURED_ALLOWED, MEASURED_NAME)
  const before = opening()
  const done = await ending(asked, given)
  const refusals = done.answer.refusals.length
  const page = commandPageAt(given.root, CHANGE_APPLY_SLUG)
  costRecorded(given.root, page, before, APPLY, APPLY, done.paths, refusals)
  return mendedInto(done.answer, given)
}

export async function applyingKept(given: Given): Promise<Answer> {
  const taken = takenIn(inputIn)
  if (typeof taken === "string") return mistaking([taken])
  return await applyWith(taken, given)
}
