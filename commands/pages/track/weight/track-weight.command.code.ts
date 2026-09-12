import { writeDailyReading } from "akasha/alan/track/daily/write-daily-points/write-daily-points.module.code.ts"
import {
  faulted,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  DAY,
  dayNow,
  saidFor,
} from "akasha/commands/pages/track/session-rows/session-rows.module.code.ts"

export const BODYWEIGHT = "--bodyweight"

const VALUED = [BODYWEIGHT, DAY]

export function poundsIn(said: string | null): number | string {
  if (said === null) return `${BODYWEIGHT} takes a weight in pounds`
  const pounds = Number(said)
  if (!Number.isFinite(pounds) || pounds <= 0) return `${said} is no weight in pounds`
  return pounds
}

export async function trackWeight(argv: readonly string[], _given: Given): Promise<Answer> {
  for (const said of argv) {
    if (said.startsWith("--") && !VALUED.includes(said)) {
      return refusedBy([`${said} is no flag this takes`])
    }
  }
  const pounds = poundsIn(saidFor(argv, BODYWEIGHT))
  if (typeof pounds === "string") return refusedBy([pounds])
  const day = saidFor(argv, DAY) ?? dayNow(new Date())
  try {
    const outcome = await writeDailyReading(day, "bodyweight", pounds)
    return told([`${day}  ${String(pounds)} lb  ${outcome}`])
  } catch (thrown) {
    return faulted(thrown)
  }
}
