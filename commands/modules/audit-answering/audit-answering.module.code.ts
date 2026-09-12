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

const NOTHING_JUDGED = "nothing was judged —"

const RAN_BEFORE = "of the audit service ran before this stopped —"

const ASKED_FOR = "those rounds were asked for"

const IN_VERDICTS = "and what they judged is in their verdicts"

const NONE_AFTER = "of the audit service ran, and no round after that started — "

const JUDGED_BEFORE = "judged before this stopped —"

const THOSE_CHECKS = "those checks were"

const NOT_ANSWERED = "and what they refused is not in this answer"

export type Keeping = (whole: readonly string[]) => string | null

export function brokenBy(thrown: unknown, rounds: readonly string[] = []): Answer {
  if (rounds.length === 0) return refusedBy([`${NOTHING_JUDGED} ${whyOf(thrown)}`], OPERATIONAL)
  return refusedBy(
    [
      `${counted(rounds.length, "round")} ${RAN_BEFORE} ${whyOf(thrown)}`,
      `${ASKED_FOR} ${rounds.join("; ")}, ${IN_VERDICTS}`,
    ],
    OPERATIONAL
  )
}

export function stoppedBy(thrown: unknown, ran: readonly string[]): Answer {
  if (ran.length === 0) return refusedBy([`${NOTHING_JUDGED} ${whyOf(thrown)}`], OPERATIONAL)
  return refusedBy(
    [
      `${counted(ran.length, "check")} ${JUDGED_BEFORE} ${whyOf(thrown)}`,
      `${THOSE_CHECKS} \`${ran.join("`, `")}\`, ${NOT_ANSWERED}`,
    ],
    OPERATIONAL
  )
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
  const ran: string[] = []
  try {
    takenBy = judging.checksFor(change)
    said = await judging.over(change, ran)
  } catch (thrown) {
    return stoppedBy(thrown, ran)
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
  readonly rounds?: readonly string[]
}

export function codeOf(round: Told): number {
  if (round.unrun.length > 0 || round.unanswered.length > 0) return OPERATIONAL
  return round.refusals.length > 0 ? DATA : OK
}

export function askedAnswer(given: Asked, keeping: Keeping | null): Answer {
  const round = given.told
  const rounds = given.rounds ?? []
  if (round.broken !== null && rounds.length === 0) {
    return refusedBy([`${NO_ROUND}${round.broken}`], OPERATIONAL)
  }
  if (round.broken !== null) {
    const ran = `${counted(rounds.length, "round")} ${NONE_AFTER}${round.broken}`
    return refusedBy([ran], OPERATIONAL)
  }
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
