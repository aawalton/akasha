import { padTwo } from "@akasha/digit-padding"
import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"

const DAY_RE = /^(\d{4})-(\d{2})-(\d{2})$/
const DAY_CAPTURES = z.tuple([z.coerce.number(), z.coerce.number(), z.coerce.number()])

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const

export const CALENDAR_WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const

const DAY_MS = 86_400_000

function pad4(n: number): string {
  return n.toString().padStart(4, "0")
}

function parseDay(dayStr: string): readonly [number, number, number] | null {
  let caps: readonly [number, number, number]
  try {
    caps = requireMatchPositional(DAY_RE, DAY_CAPTURES, dayStr)
  } catch {
    return null
  }
  const [y, m, d] = caps
  if (m < 1 || m > 12 || d < 1 || d > 31) return null
  return [y, m, d]
}

function toNoonUtc(y: number, m: number, d: number): number {
  return Date.UTC(y, m - 1, d, 12)
}

function format(y: number, m: number, d: number): string {
  return `${pad4(y)}-${padTwo(m)}-${padTwo(d)}`
}

export function addCalendarDays(dayStr: string, n: number): string {
  const parsed = parseDay(dayStr)
  if (parsed === null) return dayStr
  const dt = new Date(toNoonUtc(parsed[0], parsed[1], parsed[2]) + n * DAY_MS)
  return format(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate())
}

export function weekdayIndex(dayStr: string): number {
  const parsed = parseDay(dayStr)
  if (parsed === null) return -1
  return new Date(toNoonUtc(parsed[0], parsed[1], parsed[2])).getUTCDay()
}

export function getWeekStart(dayStr: string): string {
  const wd = weekdayIndex(dayStr)
  if (wd < 0) return dayStr
  const mondayLead = (wd + 6) % 7
  return addCalendarDays(dayStr, -mondayLead)
}

export function monthKeyOf(dayStr: string): string {
  const parsed = parseDay(dayStr)
  if (parsed === null) return ""
  return `${pad4(parsed[0])}-${padTwo(parsed[1])}`
}

export function shiftMonth(anchorDayStr: string, delta: number): string {
  const parsed = parseDay(anchorDayStr)
  if (parsed === null) return anchorDayStr
  const zeroBased = parsed[0] * 12 + (parsed[1] - 1) + delta
  const y = Math.floor(zeroBased / 12)
  const m = (((zeroBased % 12) + 12) % 12) + 1
  return format(y, m, 1)
}

export interface MonthGrid {
  monthKey: string
  label: string
  weeks: readonly (readonly string[])[]
}

export function buildMonthGrid(anchorDayStr: string): MonthGrid {
  const parsed = parseDay(anchorDayStr)
  const [y, m] = parsed ?? [1970, 1]
  const first = format(y, m, 1)
  const gridStart = getWeekStart(first)
  const weeks: string[][] = []
  for (let w = 0; w < 6; w++) {
    const row: string[] = []
    for (let d = 0; d < 7; d++) {
      row.push(addCalendarDays(gridStart, w * 7 + d))
    }
    weeks.push(row)
  }
  return { monthKey: `${pad4(y)}-${padTwo(m)}`, label: `${MONTH_NAMES[m - 1]} ${y}`, weeks }
}
