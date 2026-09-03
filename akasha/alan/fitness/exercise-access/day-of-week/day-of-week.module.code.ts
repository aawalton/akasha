import { NOON } from "@akasha/day/day-string"
import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"
import {
  type DayOfWeek,
  dayOfWeek as dayOfWeekProperty,
} from "../../schedule-days/properties/day-of-week.select-property.ts"
import { DAYS_OF_WEEK } from "../exercise-vocabulary/exercise-vocabulary.module.code.ts"

export type { DayOfWeek }

export const DAYS_OF_WEEK_MONDAY_FIRST: readonly DayOfWeek[] = dayOfWeekProperty.values

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
  return dayOfWeekFromUtcDay(new Date(Date.UTC(y, m - 1, d, NOON, 0, 0, 0)).getUTCDay())
}
