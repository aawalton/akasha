import { writeDailyReading } from "../../../../alan/track/daily/write-daily-points/write-daily-points.module.code.ts"
import { mistaking } from "../../../modules/asking/asking.module.code.ts"
import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"
import { DAY, dayNow, saidFor } from "../../../modules/session-rows/session-rows.module.code.ts"

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
      return mistaking([`${said} is no flag this takes`])
    }
  }
  const pounds = poundsIn(saidFor(argv, BODYWEIGHT))
  if (typeof pounds === "string") return mistaking([pounds])
  const day = saidFor(argv, DAY) ?? dayNow(new Date())
  try {
    const outcome = await writeDailyReading(day, "bodyweight", pounds)
    return { report: [`${day}  ${String(pounds)} lb  ${outcome}`], refusals: [], code: 0 }
  } catch (thrown) {
    return mistaking([thrown instanceof Error ? thrown.message : String(thrown)])
  }
}
