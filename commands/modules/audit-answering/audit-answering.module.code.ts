import { pointerFor } from "akasha/agents/refusals-keeping/refusals-keeping.module.code.ts"
import type { Told } from "akasha/checks/modules/audit-asking/audit-asking.module.code.ts"
import type { Judged, Judging } from "akasha/checks/modules/judging/judging.module.code.ts"
import {
  heldTo,
  reasonSaid,
} from "akasha/checks/modules/refusal-holding/refusal-holding.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
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
  return { report: [], refusals: [`nothing was judged — ${whyOf(thrown)}`], code: 3 }
}

export async function judgedOver(
  judging: Judging,
  change: Change,
  also: readonly string[],
  keeping: Keeping | null = null
): Promise<Answer> {
  if (judging.named.length === 0) return { report: [], refusals: [NOTHING_RUNS], code: 3 }
  let takenBy: readonly string[]
  let said: readonly Judged[]
  try {
    takenBy = judging.checksFor(change)
    said = await judging.over(change)
  } catch (thrown) {
    return brokenBy(thrown)
  }
  if (takenBy.length === 0) return { report: [], refusals: [NOTHING_TAKES], code: 3 }
  const held = counted(takenBy.length, "check")
  const over = `${held} judged ${counted(change.changed.length, "file")}`
  if (said.length === 0) {
    return { report: [`${over}, and none refused`, ...also], refusals: [], code: 0 }
  }
  const whole = said.map((one) => `${one.path} — ${one.reason}`)
  const at = keeping === null ? null : keeping(whole)
  const lines = said.map((one) => `${one.path} — ${reasonSaid(one.reason, REASON_CEILING)}`)
  const kept = heldTo(lines, ANSWER_CEILING)
  const unrun = said.filter((one) => one.threw === true).length
  const could =
    unrun > 0
      ? [`${counted(unrun, "check")} could not run and judged nothing, so this answer is short`]
      : []
  return {
    report: [`${over}, and ${counted(said.length, "refusal")} in all`, ...could, ...also],
    refusals: at === null ? kept : [...kept, pointerFor(at)],
    code: unrun > 0 ? 3 : 2,
  }
}

export type Asked = {
  readonly told: Told
  readonly checks: number
  readonly commit: string
  readonly also: readonly string[]
}

export function codeOf(told: Told): number {
  if (told.unrun.length > 0 || told.unanswered.length > 0) return 3
  return told.refusals.length > 0 ? 2 : 0
}

export function askedAnswer(given: Asked, keeping: Keeping | null): Answer {
  const told = given.told
  if (told.broken !== null) {
    return { report: [], refusals: [`${NO_ROUND}${told.broken}`], code: 3 }
  }
  const over = `${counted(given.checks, "check")} answered for ${given.commit}`
  const said =
    told.refusals.length === 0
      ? `${over}, and none refused`
      : `${over}, and ${counted(told.refusals.length, "refusal")} in all`
  const could =
    told.unrun.length > 0
      ? [`${counted(told.unrun.length, "check")} could not run: ${told.unrun.join(", ")}`]
      : []
  const left =
    told.unanswered.length > 0
      ? [
          `${counted(told.unanswered.length, "check")} is unanswered there: ` +
            told.unanswered.join(", "),
        ]
      : []
  const at = keeping === null || told.refusals.length === 0 ? null : keeping(told.refusals)
  const kept = heldTo(
    told.refusals.map((one) => reasonSaid(one, REASON_CEILING)),
    ANSWER_CEILING
  )
  return {
    report: [said, ...could, ...left, ...given.also],
    refusals: at === null ? kept : [...kept, pointerFor(at)],
    code: codeOf(told),
  }
}
