import { requireMatchPositional } from "@shared/utils-narrow/require-match-positional"
import { z } from "zod"

export const DAYS_OF_WEEK = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const

export type DayOfWeek = (typeof DAYS_OF_WEEK)[number]

export const DAYS_OF_WEEK_MONDAY_FIRST: readonly DayOfWeek[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]

const DAY_OF_WEEK_SET: ReadonlySet<string> = new Set(DAYS_OF_WEEK)

export function isDayOfWeek(value: string): value is DayOfWeek {
  return DAY_OF_WEEK_SET.has(value)
}

export function dayOfWeekFromUtcDay(n: number): DayOfWeek {
  const day = DAYS_OF_WEEK[n]
  if (day === undefined) {
    throw new Error(`dayOfWeekFromUtcDay: index out of range (expected 0-6, got ${n})`)
  }
  return day
}

const DAY_STR_RE = /^(\d{4})-(\d{2})-(\d{2})$/
const DAY_STR_CAPTURES = z.tuple([z.coerce.number(), z.coerce.number(), z.coerce.number()])

export function dayOfWeekFromDayStr(dayStr: string): DayOfWeek {
  const [y, m, d] = requireMatchPositional(
    DAY_STR_RE,
    DAY_STR_CAPTURES,
    dayStr,
    `day string "${dayStr}" (expected YYYY-MM-DD)`
  )
  return dayOfWeekFromUtcDay(new Date(Date.UTC(y, m - 1, d, 12, 0, 0, 0)).getUTCDay())
}

export function capitalizeDayOfWeek(day: DayOfWeek): string {
  return day.charAt(0).toUpperCase() + day.slice(1)
}
