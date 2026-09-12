import { writeDailyReading } from "akasha/alan/track/daily/write-daily-points/write-daily-points.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { bodyweight } from "akasha/commands/arguments/pages/bodyweight.argument.ts"
import { day as dayArgument } from "akasha/commands/arguments/pages/day.argument.ts"
import {
  faulted,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { dayNow } from "akasha/commands/pages/track/session-rows/session-rows.module.code.ts"
import { trackWeight as page } from "akasha/commands/pages/track/weight/track-weight.command.ts"

export function poundsIn(said: string): number | string {
  const pounds = Number(said)
  if (!Number.isFinite(pounds) || pounds <= 0) return `${said} is no weight in pounds`
  return pounds
}

export async function trackWeight(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [dayArgument, bodyweight])
  if ("refused" in read) return refusedBy(read.refused)
  const pounds = poundsIn(read.taken.bodyweight)
  if (typeof pounds === "string") return refusedBy([pounds])
  const day = read.taken.day ?? dayNow(new Date())
  try {
    const outcome = await writeDailyReading(day, "bodyweight", pounds)
    return told([`${day}  ${String(pounds)} lb  ${outcome}`])
  } catch (thrown) {
    return faulted(thrown)
  }
}
