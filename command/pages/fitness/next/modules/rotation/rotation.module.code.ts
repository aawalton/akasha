import {
  NOON,
  parseDay,
} from "akasha/alan/harness/day-boundary/modules/day-string/day-string.module.code.ts"
import type { Movement } from "akasha/command/pages/fitness/modules/training-week/training-week.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export const DAY_TYPE = "schedule-day"

export const RESTING = "rest"

const EVERY_DAY = "core"

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

export function fitsIn(one: Movement, focus: string | null): boolean {
  if (focus === null) return true
  if (focus === RESTING) return false
  return one.focus === focus || one.focus === EVERY_DAY
}
