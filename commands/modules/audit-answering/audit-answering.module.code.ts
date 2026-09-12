import { pointerFor } from "akasha/agents/refusals-keeping/refusals-keeping.module.code.ts"
import type { Told } from "akasha/checks/modules/audit-asking/audit-asking.module.code.ts"
import {
  heldTo,
  reasonSaid,
} from "akasha/checks/modules/refusal-holding/refusal-holding.module.code.ts"
import {
  answeredWith,
  DATA,
  OK,
  OPERATIONAL,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { counted } from "akasha/utils/text/modules/counted/counted.module.code.ts"

const ANSWER_CEILING = 28000

const REASON_CEILING = 240

const NO_ROUND = "no round of the audit service ran — "

const NOTHING_JUDGED = "nothing was judged —"

const RAN_BEFORE = "of the audit service ran before this stopped —"

const ASKED_FOR = "those rounds were asked for"

const IN_VERDICTS = "and what they judged is in their verdicts"

const NONE_AFTER = "of the audit service ran, and no round after that started — "

const NONE_ANSWERED =
  "this is not an audit — no check answered, so nothing judged and a clean answer would mean nothing"

const NAME_A_CHECK =
  "name a check with `--check <slug>`, or state `runsOnAudit` on a check the index names"

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
  if (given.checks === 0) return refusedBy([NONE_ANSWERED, NAME_A_CHECK], OPERATIONAL)
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
