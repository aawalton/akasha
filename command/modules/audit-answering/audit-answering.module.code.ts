import { pointerFor } from "akasha/agent/modules/refusals-keeping/refusals-keeping.module.code.ts"
import type { Told } from "akasha/check/modules/audit-asking/audit-asking.module.code.ts"
import {
  heldTo,
  reasonSaid,
} from "akasha/check/modules/refusal-holding/refusal-holding.module.code.ts"
import {
  answeredWith,
  DATA,
  OK,
  OPERATIONAL,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { ANSWER_CEILING } from "akasha/command/modules/long-body/long-body.module.code.ts"
import { counted } from "akasha/text/writing/modules/counted/counted.module.code.ts"

const REASON_CEILING = 240

const SAID_CEILING = 600

const SERVICE_SAID = "the audit service said why: "

const ASK_AGAIN = "ask again with the same `akasha audit` once that is mended"

const NO_REASON = "the audit service gave no reason, so ask again with the same `akasha audit`"

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

function headOf(answered: number, commit: string, round: Told): string {
  if (answered === 0) return `no check answered for ${commit}`
  const over = `${counted(answered, "check")} answered for ${commit}`
  if (round.refusals.length === 0) return `${over}, and none refused`
  return `${over}, and ${counted(round.refusals.length, "refusal")} in all`
}

function leftOf(unanswered: readonly string[]): readonly string[] {
  if (unanswered.length === 0) return []
  const be = unanswered.length === 1 ? "is" : "are"
  return [`${counted(unanswered.length, "check")} ${be} unanswered there: ${unanswered.join(", ")}`]
}

function becauseOf(round: Told): readonly string[] {
  if (round.unanswered.length === 0) return []
  if (round.said.length === 0) return [NO_REASON]
  return [...round.said.map((one) => `${SERVICE_SAID}${reasonSaid(one, SAID_CEILING)}`), ASK_AGAIN]
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
  const said = headOf(given.checks - round.unanswered.length, given.commit, round)
  const could =
    round.unrun.length > 0
      ? [`${counted(round.unrun.length, "check")} could not run: ${round.unrun.join(", ")}`]
      : []
  const left = [...leftOf(round.unanswered), ...becauseOf(round)]
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
