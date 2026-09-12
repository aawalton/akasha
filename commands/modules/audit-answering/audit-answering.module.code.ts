import { pointerFor } from "akasha/agents/refusals-keeping/refusals-keeping.module.code.ts"
import type { Told } from "akasha/checks/modules/audit-asking/audit-asking.module.code.ts"
import type { Judged, Judging } from "akasha/checks/modules/judging/judging.module.code.ts"
import {
  heldTo,
  reasonSaid,
} from "akasha/checks/modules/refusal-holding/refusal-holding.module.code.ts"
import {
  DATA,
  OK,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { type Answer, answeredWith } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { counted } from "akasha/utils/text/counted/counted.module.code.ts"

export const ANSWER_CEILING = 28000

export const REASON_CEILING = 240

const NOTHING_RUNS =
  "no check runs at audit, so nothing would judge the folder and a clean answer would mean nothing"

const NOTHING_TAKES =
  "no check takes a file named as input, so nothing judged it and a clean answer would mean nothing"

const NO_ROUND = "no round of the audit service ran — "

export type Keeping = (whole: readonly string[]) => string | null

export function brokenBy(thrown: unknown): Answer {
  return refusedBy([`nothing was judged — ${whyOf(thrown)}`], OPERATIONAL)
}

export async function judgedOver(
  judging: Judging,
  change: Change,
  also: readonly string[],
  keeping: Keeping | null = null
): Promise<Answer> {
  if (judging.named.length === 0) return refusedBy([NOTHING_RUNS], OPERATIONAL)
  let takenBy: readonly string[]
  let said: readonly Judged[]
  try {
    takenBy = judging.checksFor(change)
    said = await judging.over(change)
  } catch (thrown) {
    return brokenBy(thrown)
  }
  if (takenBy.length === 0) return refusedBy([NOTHING_TAKES], OPERATIONAL)
  const held = counted(takenBy.length, "check")
  const over = `${held} judged ${counted(change.changed.length, "file")}`
  if (said.length === 0) return told([`${over}, and none refused`, ...also])
  const whole = said.map((one) => `${one.path} — ${one.reason}`)
  const at = keeping === null ? null : keeping(whole)
  const lines = said.map((one) => `${one.path} — ${reasonSaid(one.reason, REASON_CEILING)}`)
  const kept = heldTo(lines, ANSWER_CEILING)
  const unrun = said.filter((one) => one.threw === true).length
  const could =
    unrun > 0
      ? [`${counted(unrun, "check")} could not run and judged nothing, so this answer is short`]
      : []
  return answeredWith(
    [`${over}, and ${counted(said.length, "refusal")} in all`, ...could, ...also],
    at === null ? kept : [...kept, pointerFor(at)],
    unrun > 0 ? OPERATIONAL : DATA
  )
}

export type Asked = {
  readonly told: Told
  readonly checks: number
  readonly commit: string
  readonly also: readonly string[]
}

export function codeOf(round: Told): number {
  if (round.unrun.length > 0 || round.unanswered.length > 0) return OPERATIONAL
  return round.refusals.length > 0 ? DATA : OK
}

export function askedAnswer(given: Asked, keeping: Keeping | null): Answer {
  const round = given.told
  if (round.broken !== null) return refusedBy([`${NO_ROUND}${round.broken}`], OPERATIONAL)
  const over = `${counted(given.checks, "check")} answered for ${given.commit}`
  const said =
    round.refusals.length === 0
      ? `${over}, and none refused`
      : `${over}, and ${counted(round.refusals.length, "refusal")} in all`
  const could =
    round.unrun.length > 0
      ? [`${counted(round.unrun.length, "check")} could not run: ${round.unrun.join(", ")}`]
      : []
  const left =
    round.unanswered.length > 0
      ? [
          `${counted(round.unanswered.length, "check")} is unanswered there: ` +
            round.unanswered.join(", "),
        ]
      : []
  const at = keeping === null || round.refusals.length === 0 ? null : keeping(round.refusals)
  const kept = heldTo(
    round.refusals.map((one) => reasonSaid(one, REASON_CEILING)),
    ANSWER_CEILING
  )
  return answeredWith(
    [said, ...could, ...left, ...given.also],
    at === null ? kept : [...kept, pointerFor(at)],
    codeOf(round)
  )
}
