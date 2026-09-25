import { getEsoDayStr } from "akasha/alan/harness/day-boundary/modules/eso-day/eso-day.module.code.ts"
import {
  CALENDAR_WEEKDAY_LABELS,
  MONTH_NAMES,
} from "akasha/page/core/view/modules/calendar-grid/calendar-grid.module.code.ts"
import { formatSmartDate } from "akasha/page/core/view/modules/format-smart-date/format-smart-date.module.code.ts"
import { padTwo } from "akasha/text/writing/modules/pad-two/pad-two.module.code.ts"
import { RRule } from "rrule"

export type RruleValue = {
  readonly rule: string
  readonly anchorFromCompletion: boolean
}

type DayPart = {
  readonly day: number
  readonly nth: number | null
}

type RuleParts = {
  readonly freq: number
  readonly interval: number
  readonly count: number | null
  readonly until: Date | null
  readonly months: readonly number[]
  readonly monthDays: readonly number[]
  readonly setPos: readonly number[]
  readonly days: readonly DayPart[]
}

const DAY_CODES: readonly string[] = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"]

const DAY_NAMES: readonly string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

const NTH_WORDS: Readonly<Record<string, string>> = {
  "1": "First",
  "2": "Second",
  "3": "Third",
  "4": "Fourth",
  "5": "Fifth",
  "-1": "Last",
}

const WEEKDAYS_KEY = "0,1,2,3,4"

const WEEKENDS_KEY = "5,6"

const ANCHOR_WORDING = " after each completion"

function isSaid(one: unknown): boolean {
  return one !== undefined && one !== null
}

function numbersOf(held: number | readonly number[] | null | undefined): readonly number[] {
  if (held === undefined || held === null) return []
  return Array.isArray(held) ? held : [held as number]
}

function dayPartOf(one: unknown): DayPart | null {
  if (typeof one === "number") {
    return Number.isInteger(one) && one >= 0 && one <= 6 ? { day: one, nth: null } : null
  }
  if (typeof one === "string") {
    const at = DAY_CODES.indexOf(one.toUpperCase())
    return at === -1 ? null : { day: at, nth: null }
  }
  if (one === null || typeof one !== "object") return null
  const day: unknown = Reflect.get(one, "weekday")
  if (typeof day !== "number" || !Number.isInteger(day) || day < 0 || day > 6) return null
  const nth: unknown = Reflect.get(one, "n")
  if (nth === undefined || nth === null) return { day, nth: null }
  if (typeof nth !== "number" || !Number.isInteger(nth)) return null
  return { day, nth }
}

function dayPartsOf(held: unknown): readonly DayPart[] | null {
  if (held === undefined || held === null) return []
  const many = Array.isArray(held) ? held : [held]
  const said: DayPart[] = []
  for (const one of many) {
    const part = dayPartOf(one)
    if (part === null) return null
    said.push(part)
  }
  return said
}

function partsOf(rule: string): RuleParts | null {
  let held: Partial<ReturnType<typeof RRule.parseString>>
  try {
    held = RRule.parseString(rule)
  } catch {
    return null
  }
  if (isSaid(held.byyearday) || isSaid(held.byweekno) || isSaid(held.byeaster)) return null
  if (isSaid(held.byhour) || isSaid(held.byminute) || isSaid(held.bysecond)) return null
  const freq = held.freq
  if (typeof freq !== "number") return null
  const interval = held.interval ?? 1
  if (!Number.isInteger(interval) || interval < 1) return null
  const days = dayPartsOf(held.byweekday)
  if (days === null) return null
  return {
    freq,
    interval,
    count: held.count ?? null,
    until: held.until ?? null,
    months: numbersOf(held.bymonth),
    monthDays: numbersOf(held.bymonthday),
    setPos: numbersOf(held.bysetpos),
    days,
  }
}

function cadenceWording(interval: number, one: string, other: string, many: string): string {
  if (interval === 1) return one
  if (interval === 2) return other
  return `Every ${interval} ${many}`
}

function monthlyCadence(interval: number): string {
  if (interval === 3) return "Quarterly"
  return cadenceWording(interval, "Monthly", "Every other month", "months")
}

function ordinalWording(day: number): string {
  const tens = day % 100
  if (tens >= 11 && tens <= 13) return `${day}th`
  switch (day % 10) {
    case 1:
      return `${day}st`
    case 2:
      return `${day}nd`
    case 3:
      return `${day}rd`
    default:
      return `${day}th`
  }
}

function joinWording(said: readonly string[]): string {
  if (said.length <= 1) return said[0] ?? ""
  return `${said.slice(0, -1).join(", ")} & ${said.at(-1) ?? ""}`
}

function shortDaysWording(days: readonly number[]): string {
  return joinWording(days.map((one) => CALENDAR_WEEKDAY_LABELS[one] ?? ""))
}

function weekOrder(days: readonly DayPart[]): readonly number[] {
  const seen = new Set<number>()
  for (const one of days) seen.add(one.day)
  return [...seen].sort((left, right) => left - right)
}

function namedDaysWording(days: readonly number[]): string | null {
  if (days.length === 7) return "Daily"
  if (days.length === 1) {
    const name = DAY_NAMES[days[0] ?? -1]
    return name === undefined ? null : `Every ${name}`
  }
  const key = days.join(",")
  if (key === WEEKDAYS_KEY) return "Weekdays"
  if (key === WEEKENDS_KEY) return "Weekends"
  return shortDaysWording(days)
}

function weeklyWording(parts: RuleParts): string | null {
  if (parts.months.length > 0 || parts.monthDays.length > 0) return null
  if (parts.setPos.length > 0) return null
  if (parts.days.some((one) => one.nth !== null)) return null
  const cadence = cadenceWording(parts.interval, "Weekly", "Every other week", "weeks")
  const days = weekOrder(parts.days)
  if (days.length === 0) return cadence
  if (parts.interval === 1) return namedDaysWording(days)
  if (days.length === 1) {
    const name = DAY_NAMES[days[0] ?? -1]
    if (name === undefined) return null
    if (parts.interval === 2) return `Every other ${name}`
    return `Every ${parts.interval} weeks on ${name}`
  }
  return `${cadence} on ${shortDaysWording(days)}`
}

type NumberedDay = {
  readonly day: number
  readonly nth: number
}

function monthOrder(nth: number): number {
  return nth < 0 ? 6 : nth
}

function numberedDaysOf(parts: RuleParts): readonly NumberedDay[] | null {
  if (parts.monthDays.length > 0) return null
  const only = parts.days.length === 1 ? parts.days[0] : undefined
  if (only !== undefined && only.nth === null) {
    const nth = parts.setPos.length === 1 ? parts.setPos[0] : undefined
    return nth === undefined ? null : [{ day: only.day, nth }]
  }
  if (parts.setPos.length > 0) return null
  const said = new Map<string, NumberedDay>()
  for (const one of parts.days) {
    if (one.nth === null) return null
    said.set(`${one.nth}:${one.day}`, { day: one.day, nth: one.nth })
  }
  return [...said.values()].sort(
    (left, right) => monthOrder(left.nth) - monthOrder(right.nth) || left.day - right.day
  )
}

function numberedWording(days: readonly NumberedDay[]): string | null {
  const said: string[] = []
  for (const one of days) {
    const word = NTH_WORDS[String(one.nth)]
    if (word === undefined || DAY_NAMES[one.day] === undefined) return null
    said.push(word.toLowerCase())
  }
  const first = days[0]
  if (first === undefined) return null
  if (days.every((one) => one.day === first.day)) {
    return `${joinWording(said)} ${DAY_NAMES[first.day] ?? ""}`
  }
  return joinWording(days.map((one, at) => `${said[at] ?? ""} ${DAY_NAMES[one.day] ?? ""}`))
}

function nthDayWording(parts: RuleParts, cadence: string): string | null {
  const days = numberedDaysOf(parts)
  if (days === null) return null
  const said = numberedWording(days)
  if (said === null) return null
  if (parts.interval === 1) return `${said.charAt(0).toUpperCase()}${said.slice(1)}`
  return `${cadence} on the ${said}`
}

function monthlyWording(parts: RuleParts): string | null {
  if (parts.months.length > 0) return null
  const cadence = monthlyCadence(parts.interval)
  if (parts.days.length > 0) return nthDayWording(parts, cadence)
  if (parts.setPos.length > 0) return null
  if (parts.monthDays.length === 0) return cadence
  if (parts.monthDays.length !== 1) return null
  const day = parts.monthDays[0] ?? 0
  if (day === -1) {
    return parts.interval === 1 ? "Last day of the month" : `${cadence} on the last day`
  }
  if (!Number.isInteger(day) || day < 1 || day > 31) return null
  return `${cadence} on the ${ordinalWording(day)}`
}

function yearlyWording(parts: RuleParts): string | null {
  if (parts.days.length > 0 || parts.setPos.length > 0) return null
  const cadence = cadenceWording(parts.interval, "Yearly", "Every other year", "years")
  if (parts.months.length === 0) {
    return parts.monthDays.length === 0 ? cadence : null
  }
  if (parts.months.length !== 1) return null
  const month = MONTH_NAMES[(parts.months[0] ?? 0) - 1]
  if (month === undefined) return null
  if (parts.monthDays.length === 0) {
    return parts.interval === 1 ? `Every ${month}` : `${cadence} in ${month}`
  }
  if (parts.monthDays.length !== 1) return null
  const day = parts.monthDays[0] ?? 0
  if (!Number.isInteger(day) || day < 1 || day > 31) return null
  if (parts.interval === 1) return `Every ${day} ${month}`
  return `${cadence} on ${day} ${month}`
}

function hasByParts(parts: RuleParts): boolean {
  if (parts.days.length > 0 || parts.monthDays.length > 0) return true
  return parts.months.length > 0 || parts.setPos.length > 0
}

function baseWording(parts: RuleParts): string | null {
  switch (parts.freq) {
    case RRule.MINUTELY:
      return hasByParts(parts)
        ? null
        : cadenceWording(parts.interval, "Every minute", "Every other minute", "minutes")
    case RRule.HOURLY:
      return hasByParts(parts)
        ? null
        : cadenceWording(parts.interval, "Hourly", "Every other hour", "hours")
    case RRule.DAILY:
      return hasByParts(parts)
        ? null
        : cadenceWording(parts.interval, "Daily", "Every other day", "days")
    case RRule.WEEKLY:
      return weeklyWording(parts)
    case RRule.MONTHLY:
      return monthlyWording(parts)
    case RRule.YEARLY:
      return yearlyWording(parts)
    default:
      return null
  }
}

function instantOf(now: Date | string | undefined): Date {
  if (now === undefined) return new Date()
  if (typeof now === "string") {
    const ms = Date.parse(now)
    return Number.isFinite(ms) ? new Date(ms) : new Date()
  }
  return now
}

function untilWording(until: Date, now: Date | string | undefined): string | null {
  if (!Number.isFinite(until.getTime())) return null
  const at = instantOf(now)
  const year = until.getUTCFullYear()
  const day = `${year}-${padTwo(until.getUTCMonth() + 1)}-${padTwo(until.getUTCDate())}`
  const said = formatSmartDate(day, at)
  if (getEsoDayStr(at).slice(0, 4) !== String(year)) return said
  const tail = ` ${year}`
  return said.endsWith(tail) ? said.slice(0, -tail.length) : said
}

function boundWording(parts: RuleParts, now: Date | string | undefined): string | null {
  const count = parts.count
  if (count !== null && parts.until !== null) return null
  if (count !== null) {
    if (!Number.isInteger(count) || count < 1) return null
    return count === 1 ? ", once" : `, ${count} times`
  }
  if (parts.until === null) return ""
  const said = untilWording(parts.until, now)
  return said === null ? null : `, until ${said}`
}

function wordingOf(
  rule: string,
  anchorFromCompletion: boolean,
  now: Date | string | undefined
): string {
  const parts = partsOf(rule)
  if (parts === null) return rule
  const base = baseWording(parts)
  if (base === null) return rule
  const bound = boundWording(parts, now)
  if (bound === null) return rule
  return `${base}${anchorFromCompletion ? ANCHOR_WORDING : ""}${bound}`
}

export function ruleWording(rule: string, now?: Date | string): string {
  return wordingOf(rule, false, now)
}

export function rruleWording(value: RruleValue, now?: Date | string): string {
  return wordingOf(value.rule, value.anchorFromCompletion, now)
}
