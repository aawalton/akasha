import { getEsoDayStr } from "@akasha/day/eso-day"
import { dayVolume } from "@akasha/exercise-access/session-volume"
import { daysUpTo } from "../day-active-calories/day-active-calories.module.code.ts"
import {
  type WriteOutcome,
  writeStrengthVolume,
} from "../write-daily-points/write-daily-points.module.code.ts"

const DAYS_ROLLED = 4

export async function rollupStrengthForDay(
  dayStr: string
): Promise<{ strengthVolume: number; outcome: WriteOutcome }> {
  const counted = await dayVolume(dayStr)
  if ("refused" in counted) {
    throw new Error(`the strength volume for ${dayStr} went uncounted: ${counted.refused}`)
  }
  const strengthVolume = counted.volume
  const outcome = await writeStrengthVolume(dayStr, strengthVolume)
  return { strengthVolume, outcome }
}

if (import.meta.main) {
  const landed: string[] = []
  for (const day of daysUpTo(getEsoDayStr(new Date()), DAYS_ROLLED)) {
    try {
      const rolled = await rollupStrengthForDay(day)
      landed.push(`${day} ${rolled.outcome}`)
    } catch (thrown) {
      const why = thrown instanceof Error ? thrown.message : String(thrown)
      process.stderr.write(`the strength volume for ${day} did not land: ${why}\n`)
    }
  }
  if (landed.length === 0) {
    process.stderr.write("no day of the four was counted, so no strength volume landed\n")
    process.exit(2)
  }
  process.stdout.write(`strength volume landed on ${landed.join(", ")}\n`)
}
