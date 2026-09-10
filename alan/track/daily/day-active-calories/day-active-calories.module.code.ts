import { getEsoDayStr } from "akasha/alan/harness/day/eso-day/eso-day.module.code.ts"
import {
  dayStrOf,
  MS_PER_DAY,
  NOON,
  parseDay,
} from "akasha/alan/harness/day/string/day-string.module.code.ts"
import { loadActiveCaloriesByDay } from "akasha/alan/harness/health-samples-day/active-calories/active-calories.module.code.ts"
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

export function daysUpTo(dayStr: string, count: number): readonly string[] {
  const parsed = parseDay(dayStr)
  if (parsed === null) return [dayStr]
  const [y, m, d] = parsed
  const at = Date.UTC(y, m - 1, d, NOON, 0, 0, 0)
  const days: string[] = []
  for (let back = count - 1; back >= 0; back -= 1) {
    days.push(dayStrOf(new Date(at - back * MS_PER_DAY)))
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
  process.stdout.write(`active calories on ${landed.join(", ")}\n`)
}
