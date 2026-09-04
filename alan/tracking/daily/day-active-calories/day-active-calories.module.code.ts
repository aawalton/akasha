import { loadActiveCaloriesByDay } from "@akasha/health-samples-day/active-calories"
import {
  type WriteOutcome,
  writeActiveCalories,
} from "../write-daily-points/write-daily-points.module.code.ts"

export async function rollupActiveCaloriesForDay(
  dayStr: string
): Promise<{ activeCalories: number | null; outcome: WriteOutcome | "unmeasured" }> {
  const read = await loadActiveCaloriesByDay({ dayStrs: [dayStr] })
  if (read.unread.length > 0) {
    process.stderr.write(`cardio: ${dayStr} has no recorded wake, so its span is not known\n`)
    return { activeCalories: null, outcome: "unmeasured" }
  }
  const activeCalories = read.byDay.get(dayStr) ?? null
  if (activeCalories === null) return { activeCalories: null, outcome: "unmeasured" }
  const outcome = await writeActiveCalories(dayStr, activeCalories)
  return { activeCalories, outcome }
}
