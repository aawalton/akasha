import { getEsoDayAnchor } from "@akasha/day/eso-day"
import * as chrono from "chrono-node"
import { z } from "zod"

const NULLABLE_MATCH_SCHEMA = z.array(z.string()).min(2).nullable()

export interface ParsedDate {
  date?: string
  time?: string
  rrule?: string
  rruleFromCompletion?: boolean
  startDate?: string
  matchedText: string
}

const TIME_OF_DAY_MAP: Record<string, string> = {
  morning: "09:00",
  afternoon: "12:00",
  evening: "19:00",
}

function formatAnchor(d: Date): string {
  const year = d.getUTCFullYear()
  const month = String(d.getUTCMonth() + 1).padStart(2, "0")
  const day = String(d.getUTCDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function formatLocalDate(d: Date): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function formatTime(hours: number, minutes: number): string {
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}

function parseKeyword(input: string, refAnchor: Date): ParsedDate | null {
  const lower = input.trim().toLowerCase()

  if (lower === "no date") {
    return { matchedText: input.trim() }
  }

  if (lower === "someday") {
    return { matchedText: input.trim() }
  }

  if (lower === "today" || lower === "tod") {
    return { date: formatAnchor(refAnchor), matchedText: input.trim() }
  }

  if (lower === "tomorrow" || lower === "tom") {
    const d = new Date(refAnchor)
    d.setUTCDate(d.getUTCDate() + 1)
    return { date: formatAnchor(d), matchedText: input.trim() }
  }

  if (lower === "later this week") {
    const d = new Date(refAnchor)
    const dow = d.getUTCDay()
    let target = 4
    if (dow >= 4) target = dow + 1
    if (target > 6) target = 6
    d.setUTCDate(d.getUTCDate() + (target - dow))
    return { date: formatAnchor(d), matchedText: input.trim() }
  }

  if (lower === "this weekend") {
    const d = new Date(refAnchor)
    const dow = d.getUTCDay()
    const daysUntilSat = dow === 6 ? 0 : 6 - dow
    d.setUTCDate(d.getUTCDate() + daysUntilSat)
    return { date: formatAnchor(d), matchedText: input.trim() }
  }

  if (lower === "next weekend") {
    const d = new Date(refAnchor)
    const dow = d.getUTCDay()
    const daysUntilSat = 6 - dow + 7
    d.setUTCDate(d.getUTCDate() + daysUntilSat)
    return { date: formatAnchor(d), matchedText: input.trim() }
  }

  if (lower === "next week") {
    const d = new Date(refAnchor)
    const dow = d.getUTCDay()
    const daysUntilMon = dow === 0 ? 1 : 8 - dow
    d.setUTCDate(d.getUTCDate() + daysUntilMon)
    return { date: formatAnchor(d), matchedText: input.trim() }
  }

  if (lower === "next month") {
    const d = new Date(refAnchor)
    d.setUTCMonth(d.getUTCMonth() + 1, 1)
    return { date: formatAnchor(d), matchedText: input.trim() }
  }

  if (lower === "next year") {
    const d = new Date(refAnchor)
    d.setUTCFullYear(d.getUTCFullYear() + 1, 0, 1)
    return { date: formatAnchor(d), matchedText: input.trim() }
  }

  if (lower === "end of month") {
    const d = new Date(refAnchor)
    d.setUTCMonth(d.getUTCMonth() + 1, 0)
    return { date: formatAnchor(d), matchedText: input.trim() }
  }

  return null
}

function parseTimeOfDay(input: string): { base: string; time: string } | null {
  const lower = input.trim().toLowerCase()
  for (const [keyword, time] of Object.entries(TIME_OF_DAY_MAP)) {
    if (lower.endsWith(` ${keyword}`)) {
      const base = lower.slice(0, lower.length - keyword.length - 1).trim()
      return { base, time }
    }
    if (lower === keyword) {
      return { base: "today", time }
    }
  }
  return null
}

function parseMidMonth(input: string, refAnchor: Date): ParsedDate | null {
  const match = NULLABLE_MATCH_SCHEMA.parse(
    input
      .trim()
      .match(
        /^mid\s+(january|february|march|april|may|june|july|august|september|october|november|december)$/i
      )
  )
  if (!match) return null

  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ]
  const monthName = match[1]
  if (monthName === undefined) return null
  const monthIndex = monthNames.indexOf(monthName.toLowerCase())
  let year = refAnchor.getUTCFullYear()
  if (monthIndex < refAnchor.getUTCMonth()) {
    year++
  } else if (monthIndex === refAnchor.getUTCMonth() && 15 < refAnchor.getUTCDate()) {
    year++
  }
  const d = new Date(Date.UTC(year, monthIndex, 15, 12, 0, 0, 0))
  return { date: formatAnchor(d), matchedText: input.trim() }
}

function parseOffsetBefore(input: string, refAnchor: Date): ParsedDate | null {
  const match = z
    .array(z.string())
    .min(4)
    .nullable()
    .parse(input.trim().match(/^(\d+)\s+(days?|weeks?|months?)\s+before\s+(.+)$/i))
  if (!match) return null

  const amountStr = match[1]
  const unitRaw = match[2]
  const targetRaw = match[3]
  if (amountStr === undefined || unitRaw === undefined || targetRaw === undefined) return null
  const amount = Number.parseInt(amountStr, 10)
  const unit = unitRaw.toLowerCase().replace(/s$/, "")
  const targetStr = targetRaw.trim()

  let target: Date | null = null

  if (targetStr.toLowerCase() === "new year's eve") {
    const refYear = refAnchor.getUTCFullYear()
    let candidate = new Date(Date.UTC(refYear, 11, 31, 12, 0, 0, 0))
    if (candidate <= refAnchor) {
      candidate = new Date(Date.UTC(refYear + 1, 11, 31, 12, 0, 0, 0))
    }
    target = candidate
  } else {
    const parsed = chrono.parseDate(targetStr, refAnchor)
    if (parsed) {
      target = new Date(
        Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate(), 12, 0, 0, 0)
      )
    }
  }

  if (!target) return null

  const result = new Date(target)
  if (unit === "day") {
    result.setUTCDate(result.getUTCDate() - amount)
  } else if (unit === "week") {
    result.setUTCDate(result.getUTCDate() - amount * 7)
  } else if (unit === "month") {
    result.setUTCMonth(result.getUTCMonth() - amount)
  }

  return { date: formatAnchor(result), matchedText: input.trim() }
}

function parsePlusShorthand(input: string, refDate: Date, refAnchor: Date): ParsedDate | null {
  const match = z
    .array(z.string())
    .min(3)
    .nullable()
    .parse(input.trim().match(/^\+(\d+)\s*(days?|d|weeks?|w|months?|m|hours?|h)$/i))
  if (!match) return null

  const amountStr = match[1]
  const unitRaw = match[2]
  if (amountStr === undefined || unitRaw === undefined) return null
  const amount = Number.parseInt(amountStr, 10)
  const unit = unitRaw.toLowerCase()

  if (unit.startsWith("h")) {
    const d = new Date(refDate)
    d.setHours(d.getHours() + amount)
    return {
      date: formatLocalDate(d),
      time: formatTime(d.getHours(), d.getMinutes()),
      matchedText: input.trim(),
    }
  }

  const d = new Date(refAnchor)
  if (unit.startsWith("d")) {
    d.setUTCDate(d.getUTCDate() + amount)
  } else if (unit.startsWith("w")) {
    d.setUTCDate(d.getUTCDate() + amount * 7)
  } else if (unit.startsWith("m") && unit !== "min") {
    d.setUTCMonth(d.getUTCMonth() + amount)
  }

  return { date: formatAnchor(d), matchedText: input.trim() }
}

function parseNextWeekday(input: string, refAnchor: Date): ParsedDate | null {
  const match = NULLABLE_MATCH_SCHEMA.parse(
    input
      .trim()
      .match(
        /^next\s+(monday|mon|tuesday|tue|wednesday|wed|thursday|thu|friday|fri|saturday|sat|sunday|sun)$/i
      )
  )
  if (!match) return null

  const dayNameMap: Record<string, number> = {
    sunday: 0,
    sun: 0,
    monday: 1,
    mon: 1,
    tuesday: 2,
    tue: 2,
    wednesday: 3,
    wed: 3,
    thursday: 4,
    thu: 4,
    friday: 5,
    fri: 5,
    saturday: 6,
    sat: 6,
  }

  const dayName = match[1]
  if (dayName === undefined) return null
  const targetDay = dayNameMap[dayName.toLowerCase()]
  if (targetDay === undefined) return null

  const d = new Date(refAnchor)
  const currentDay = d.getUTCDay()
  let diff = targetDay - currentDay
  if (diff <= 0) diff += 7
  d.setUTCDate(d.getUTCDate() + diff)

  return { date: formatAnchor(d), matchedText: input.trim() }
}

export function parseDateExpression(
  input: string,
  referenceDate?: Date,
  parseRecurring?: (input: string) => ParsedDate | null
): ParsedDate | null {
  const trimmed = input.trim()
  if (trimmed === "") return null

  const refDate = referenceDate ?? new Date()
  const refAnchor = getEsoDayAnchor(refDate)

  if (parseRecurring) {
    const recurring = parseRecurring(trimmed)
    if (recurring) return recurring
  }

  const tod = parseTimeOfDay(trimmed)
  if (tod) {
    const baseParsed = parseDateExpression(tod.base, refDate)
    if (baseParsed) {
      return { ...baseParsed, time: tod.time, matchedText: trimmed }
    }
    return { date: formatAnchor(refAnchor), time: tod.time, matchedText: trimmed }
  }

  const keyword = parseKeyword(trimmed, refAnchor)
  if (keyword) return keyword

  const nextWd = parseNextWeekday(trimmed, refAnchor)
  if (nextWd) return nextWd

  const midMonth = parseMidMonth(trimmed, refAnchor)
  if (midMonth) return midMonth

  const offset = parseOffsetBefore(trimmed, refAnchor)
  if (offset) return offset

  const plus = parsePlusShorthand(trimmed, refDate, refAnchor)
  if (plus) return plus

  const normalized = trimmed.replace(/\s*@\s*/g, " at ")
  const results = chrono.parse(normalized, refDate)
  const result = results[0]
  if (result) {
    const parsed: ParsedDate = { matchedText: result.text }

    const startDate = result.start.date()
    parsed.date = formatLocalDate(startDate)

    if (result.start.isCertain("hour")) {
      parsed.time = formatTime(startDate.getHours(), startDate.getMinutes())
    }

    return parsed
  }

  return null
}
