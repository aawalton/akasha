import {
  getEsoDayAnchor,
  getEsoDayStr,
  getEsoDayStrOffset,
  getEsoResetTime,
} from "@akasha/day/eso-day"
import { assertNever } from "@akasha/utils-narrow/assert-never"

type DateSentinel =
  | "today"
  | "tomorrow"
  | "yesterday"
  | "one_week_ago"
  | "one_week_from_now"
  | "one_month_ago"
  | "one_month_from_now"
  | "custom_date"

type RelativeDirection = "past" | "next" | "this"
type RelativeUnit = "day" | "week" | "month" | "year"

export interface RelativeToTodayValue {
  readonly type: "relative_to_today"
  readonly direction: RelativeDirection
  readonly unit: RelativeUnit
}

export interface SentinelDateValue {
  readonly sentinel: DateSentinel
  readonly customDate?: string
}

export interface SentinelInstantValue {
  readonly sentinel: DateSentinel
  readonly customInstant?: number
}

export interface BetweenDateValue {
  readonly type: "between"
  readonly start: SentinelDateValue
  readonly end: SentinelDateValue
}

export interface BetweenInstantValue {
  readonly type: "between"
  readonly start: SentinelInstantValue
  readonly end: SentinelInstantValue
}

export const DATE_SENTINEL_OPTIONS: ReadonlyArray<{ value: DateSentinel; label: string }> = [
  { value: "today", label: "Today" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "yesterday", label: "Yesterday" },
  { value: "one_week_ago", label: "One week ago" },
  { value: "one_week_from_now", label: "One week from now" },
  { value: "one_month_ago", label: "One month ago" },
  { value: "one_month_from_now", label: "One month from now" },
  { value: "custom_date", label: "Custom date" },
]

export const RELATIVE_DIRECTION_OPTIONS: ReadonlyArray<{
  value: RelativeDirection
  label: string
}> = [
  { value: "past", label: "Past" },
  { value: "next", label: "Next" },
  { value: "this", label: "This" },
]

export const RELATIVE_UNIT_OPTIONS: ReadonlyArray<{ value: RelativeUnit; label: string }> = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
]

const RELATIVE_DIRECTIONS = new Set<string>(RELATIVE_DIRECTION_OPTIONS.map((o) => o.value))
const RELATIVE_UNITS = new Set<string>(RELATIVE_UNIT_OPTIONS.map((o) => o.value))

function isRelativeDirection(v: unknown): v is RelativeDirection {
  return typeof v === "string" && RELATIVE_DIRECTIONS.has(v)
}

function isRelativeUnit(v: unknown): v is RelativeUnit {
  return typeof v === "string" && RELATIVE_UNITS.has(v)
}

export function isRelativeToTodayValue(value: unknown): value is RelativeToTodayValue {
  if (value == null || typeof value !== "object") return false
  if (!("type" in value) || value.type !== "relative_to_today") return false
  if (!("direction" in value) || !isRelativeDirection(value.direction)) return false
  if (!("unit" in value) || !isRelativeUnit(value.unit)) return false
  return true
}

function formatAnchorAsDateStr(anchor: Date): string {
  const y = anchor.getUTCFullYear().toString().padStart(4, "0")
  const m = (anchor.getUTCMonth() + 1).toString().padStart(2, "0")
  const day = anchor.getUTCDate().toString().padStart(2, "0")
  return `${y}-${m}-${day}`
}

function dateStrToStartOfDayMs(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number)
  if (y === undefined || m === undefined || d === undefined) {
    throw new Error(`dateStrToStartOfDayMs: malformed date string ${dateStr}`)
  }
  const noonUtc = new Date(Date.UTC(y, m - 1, d, 12, 0, 0, 0))
  return getEsoResetTime(noonUtc).getTime()
}

export function resolveDateSentinel(
  sentinel: DateSentinel,
  customDate?: string,
  now?: Date
): string {
  const reference = now ?? new Date()

  switch (sentinel) {
    case "today":
      return getEsoDayStr(reference)
    case "tomorrow":
      return getEsoDayStrOffset(reference, 1)
    case "yesterday":
      return getEsoDayStrOffset(reference, -1)
    case "one_week_ago":
      return getEsoDayStrOffset(reference, -7)
    case "one_week_from_now":
      return getEsoDayStrOffset(reference, 7)
    case "one_month_ago": {
      const anchor = getEsoDayAnchor(reference)
      anchor.setUTCMonth(anchor.getUTCMonth() - 1)
      return formatAnchorAsDateStr(anchor)
    }
    case "one_month_from_now": {
      const anchor = getEsoDayAnchor(reference)
      anchor.setUTCMonth(anchor.getUTCMonth() + 1)
      return formatAnchorAsDateStr(anchor)
    }
    case "custom_date": {
      if (customDate == null) throw new Error("custom_date sentinel requires a customDate value")
      return customDate
    }
    default:
      assertNever(sentinel)
  }
}

export function resolveInstantSentinel(
  sentinel: DateSentinel,
  customInstant?: number,
  now?: Date
): number {
  if (sentinel === "custom_date") {
    if (customInstant == null)
      throw new Error("custom_date sentinel requires a customInstant value")
    return customInstant
  }
  const dateStr = resolveDateSentinel(sentinel, undefined, now)
  return dateStrToStartOfDayMs(dateStr)
}

export function resolveInstantSentinelEndOfDay(
  sentinel: DateSentinel,
  customInstant?: number,
  now?: Date
): number {
  if (sentinel === "custom_date") {
    if (customInstant == null)
      throw new Error("custom_date sentinel requires a customInstant value")
    return customInstant
  }
  const dateStr = resolveDateSentinel(sentinel, undefined, now)
  const [y, m, d] = dateStr.split("-").map(Number)
  if (y === undefined || m === undefined || d === undefined) {
    throw new Error(`resolveInstantSentinelEndOfDay: malformed date string ${dateStr}`)
  }
  const nextDayAnchor = new Date(Date.UTC(y, m - 1, d, 12, 0, 0, 0))
  nextDayAnchor.setUTCDate(nextDayAnchor.getUTCDate() + 1)
  const nextDayStr = formatAnchorAsDateStr(nextDayAnchor)
  return dateStrToStartOfDayMs(nextDayStr) - 1
}

export function resolveSentinelInstantDayRange(
  value: SentinelInstantValue,
  now?: Date
): { start: number; end: number } {
  const seedMs = resolveInstantSentinel(value.sentinel, value.customInstant, now)
  const dayStr = getEsoDayStr(new Date(seedMs))
  const start = dateStrToStartOfDayMs(dayStr)
  const [y, m, d] = dayStr.split("-").map(Number)
  if (y === undefined || m === undefined || d === undefined) {
    throw new Error(`resolveSentinelInstantDayRange: malformed dayStr ${dayStr}`)
  }
  const nextDay = new Date(Date.UTC(y, m - 1, d, 12, 0, 0, 0))
  nextDay.setUTCDate(nextDay.getUTCDate() + 1)
  const end = dateStrToStartOfDayMs(formatAnchorAsDateStr(nextDay))
  return { start, end }
}

export function resolveRelativeToToday(
  value: RelativeToTodayValue,
  now?: Date
): { start: string; end: string } {
  const reference = now ?? new Date()
  const anchor = getEsoDayAnchor(reference)
  const { direction, unit } = value

  switch (unit) {
    case "day": {
      if (direction === "this") {
        const start = formatAnchorAsDateStr(anchor)
        const end = getEsoDayStrOffset(reference, 1)
        return { start, end }
      }
      if (direction === "past") {
        const start = getEsoDayStrOffset(reference, -1)
        const end = formatAnchorAsDateStr(anchor)
        return { start, end }
      }
      const start = getEsoDayStrOffset(reference, 1)
      const end = getEsoDayStrOffset(reference, 2)
      return { start, end }
    }

    case "week": {
      const dayOfWeek = anchor.getUTCDay()
      const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek

      if (direction === "this") {
        const start = getEsoDayStrOffset(reference, mondayOffset)
        const end = getEsoDayStrOffset(reference, mondayOffset + 7)
        return { start, end }
      }
      if (direction === "past") {
        const start = getEsoDayStrOffset(reference, mondayOffset - 7)
        const end = getEsoDayStrOffset(reference, mondayOffset)
        return { start, end }
      }
      const start = getEsoDayStrOffset(reference, mondayOffset + 7)
      const end = getEsoDayStrOffset(reference, mondayOffset + 14)
      return { start, end }
    }

    case "month": {
      if (direction === "this") {
        const first = new Date(anchor.getTime())
        first.setUTCDate(1)
        const next = new Date(first.getTime())
        next.setUTCMonth(next.getUTCMonth() + 1)
        return { start: formatAnchorAsDateStr(first), end: formatAnchorAsDateStr(next) }
      }
      if (direction === "past") {
        const first = new Date(anchor.getTime())
        first.setUTCDate(1)
        first.setUTCMonth(first.getUTCMonth() - 1)
        const next = new Date(first.getTime())
        next.setUTCMonth(next.getUTCMonth() + 1)
        return { start: formatAnchorAsDateStr(first), end: formatAnchorAsDateStr(next) }
      }
      const first = new Date(anchor.getTime())
      first.setUTCDate(1)
      first.setUTCMonth(first.getUTCMonth() + 1)
      const next = new Date(first.getTime())
      next.setUTCMonth(next.getUTCMonth() + 1)
      return { start: formatAnchorAsDateStr(first), end: formatAnchorAsDateStr(next) }
    }

    case "year": {
      const y = anchor.getUTCFullYear()
      if (direction === "this") {
        return { start: `${y}-01-01`, end: `${y + 1}-01-01` }
      }
      if (direction === "past") {
        return { start: `${y - 1}-01-01`, end: `${y}-01-01` }
      }
      return { start: `${y + 1}-01-01`, end: `${y + 2}-01-01` }
    }
    default:
      assertNever(unit)
  }
}

export function resolveRelativeToTodayInstant(
  value: RelativeToTodayValue,
  now?: Date
): { start: number; end: number } {
  const { start, end } = resolveRelativeToToday(value, now)
  return {
    start: dateStrToStartOfDayMs(start),
    end: dateStrToStartOfDayMs(end),
  }
}
