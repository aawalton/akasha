import type { Judged, Judging } from "akasha/checks/modules/judging/judging.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { pointerFor } from "akasha/commands/modules/refusals-keeping/refusals-keeping.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { counted } from "akasha/utils/text/counted/counted.module.code.ts"

export const ANSWER_CEILING = 28000

export const REASON_CEILING = 240

const NOTHING_RUNS =
  "no check runs at audit, so nothing would judge the folder and a clean answer would mean nothing"

const NOTHING_TAKES =
  "no check takes a file named as input, so nothing judged it and a clean answer would mean nothing"

export type Keeping = (whole: readonly string[]) => string | null

export function brokenBy(thrown: unknown): Answer {
  return { report: [], refusals: [`nothing was judged — ${whyOf(thrown)}`], code: 3 }
}

export function heldTo(said: readonly string[], ceiling: number): readonly string[] {
  const held: string[] = []
  let bytes = 0
  for (const one of said) {
    bytes += new TextEncoder().encode(one).length + 1
    if (bytes > ceiling) {
      held.push(
        `${counted(said.length, "refusal")} in all, and the ${held.length} above are what one ` +
          `answer holds at ${ceiling} bytes — begin with those`
      )
      return held
    }
    held.push(one)
  }
  return held
}

export function reasonSaid(reason: string, ceiling: number): string {
  const said = reason
    .split("\n")
    .map((one) => one.replace(/\s+/g, " ").trim())
    .filter((one) => one !== "")
  const kept: string[] = []
  let held = 0
  for (const one of said) {
    if (kept.length > 0 && held + one.length + 1 > ceiling) break
    kept.push(one)
    held += one.length + 1
  }
  const whole = kept.join(" ")
  const over = whole.length - ceiling
  const more: string[] = []
  if (over > 0) more.push(counted(over, "character"))
  if (said.length > kept.length) more.push(counted(said.length - kept.length, "line"))
  const shown = over > 0 ? `${whole.slice(0, ceiling)}...` : whole
  return more.length === 0 ? shown : `${shown} (${more.join(" and ")} more)`
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
