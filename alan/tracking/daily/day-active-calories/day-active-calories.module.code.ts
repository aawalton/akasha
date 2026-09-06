import { getEsoDayStr } from "@akasha/day/eso-day"
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

const DAYS_ROLLED = 4

const A_DAY = 86400000

/**
 * The four days ending on the one named, oldest first.
 *
 * A sample reaches the checkout long after the moment the sample was taken: the phone drains from an
 * anchor, so a day is filled in over several arrivals rather than at once. Recomputing today alone
 * would leave a day whose samples arrived late carrying the figure that day had while its samples
 * were still on the phone. Four is what the calorie reader takes in one run.
 */
export function daysUpTo(dayStr: string, count: number): readonly string[] {
  const at = new Date(`${dayStr}T00:00:00Z`).getTime()
  if (!Number.isFinite(at)) return [dayStr]
  const days: string[] = []
  for (let back = count - 1; back >= 0; back -= 1) {
    days.push(new Date(at - back * A_DAY).toISOString().slice(0, 10))
  }
  return days
}

if (import.meta.main) {
  const landed: string[] = []
  for (const day of daysUpTo(getEsoDayStr(new Date()), DAYS_ROLLED)) {
    try {
      const rolled = await rollupActiveCaloriesForDay(day)
      if (rolled.activeCalories !== null) landed.push(`${day} ${rolled.outcome}`)
    } catch (thrown) {
      const why = thrown instanceof Error ? thrown.message : String(thrown)
      process.stderr.write(`the active calories for ${day} did not land: ${why}\n`)
    }
  }
  if (landed.length === 0) {
    process.stderr.write(
      "no day of the four carries a health sample the calories are counted from\n"
    )
    process.exit(2)
  }
  process.stdout.write(`active calories landed on ${landed.join(", ")}\n`)
}
