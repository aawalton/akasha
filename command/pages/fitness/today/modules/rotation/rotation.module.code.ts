import {
  NOON,
  parseDay,
} from "akasha/alan/harness/day-boundary/modules/day-string/day-string.computed-property-module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export const DAY_TYPE = "schedule-day"

const WEEKDAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

export function weekdayOn(day: string): string | null {
  const parsed = parseDay(day)
  if (parsed === null) return null
  const [year, month, date] = parsed
  const at = new Date(Date.UTC(year, month - 1, date, NOON, 0, 0, 0))
  if (!Number.isFinite(at.getTime())) return null
  return WEEKDAYS[at.getUTCDay()] ?? null
}

export function focusOn(days: readonly Value[], weekday: string): string | null {
  for (const one of days) {
    if (textAt(one, "dayOfWeek") === weekday) return textAt(one, "focus")
  }
  return null
}
