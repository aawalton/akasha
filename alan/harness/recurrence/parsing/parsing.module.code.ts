import { padTwo } from "@akasha/digit-padding"
import { RRule } from "rrule"
import { z } from "zod"

export interface ParsedRecurringText {
  rrule: string
  rruleFromCompletion: boolean
  time: string | null
}

const PREFIX_REGEX = /^every(!)?\s+(.+)$/i
const TRAILING_TIME_REGEX = /^(.*?)\s+at\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm)?|\d{1,2}:\d{2})\s*$/i
const AMPM_REGEX = /^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/
const H24_REGEX = /^(\d{1,2}):(\d{2})$/

const PREFIX_MATCH_SCHEMA = z.array(z.string().optional()).min(3).nullable()
const TRAILING_MATCH_SCHEMA = z.array(z.string().optional()).min(3).nullable()
const AMPM_MATCH_SCHEMA = z.array(z.string().optional()).min(4).nullable()
const H24_MATCH_SCHEMA = z.array(z.string().optional()).min(3).nullable()

export function parseRecurringText(input: string): ParsedRecurringText | null {
  const trimmed = input.trim()
  if (trimmed === "") return null

  const prefix = PREFIX_MATCH_SCHEMA.parse(trimmed.match(PREFIX_REGEX))
  if (prefix === null) return null
  const bang = prefix[1]
  const restRaw = prefix[2]
  if (restRaw === undefined) return null
  const rruleFromCompletion = bang === "!"

  let rest = restRaw
  let time: string | null = null
  const trailing = TRAILING_MATCH_SCHEMA.parse(rest.match(TRAILING_TIME_REGEX))
  if (trailing !== null) {
    const beforeTime = trailing[1]
    const timeToken = trailing[2]
    if (beforeTime !== undefined && timeToken !== undefined) {
      const parsedTime = parseTime(timeToken)
      if (parsedTime !== null) {
        time = parsedTime
        rest = beforeTime.trimEnd()
      }
    }
  }

  const rruleSource = `every ${rest}`

  let rule: RRule
  try {
    rule = RRule.fromText(rruleSource)
  } catch {
    return null
  }

  const options = rule.origOptions
  if (options.freq === undefined || options.freq === null) return null

  let ruleString = rule.toString()
  if (ruleString.startsWith("RRULE:")) ruleString = ruleString.slice(6)

  return { rrule: ruleString, rruleFromCompletion, time }
}

function parseTime(token: string): string | null {
  const lower = token.trim().toLowerCase()

  const ampm = AMPM_MATCH_SCHEMA.parse(lower.match(AMPM_REGEX))
  if (ampm !== null) {
    const hourStr = ampm[1]
    const minuteStr = ampm[2]
    const meridiem = ampm[3]
    if (hourStr === undefined || meridiem === undefined) return null
    const hourRaw = Number(hourStr)
    const minute = minuteStr !== undefined ? Number(minuteStr) : 0
    if (hourRaw < 1 || hourRaw > 12) return null
    if (minute < 0 || minute > 59) return null
    let hour = hourRaw % 12
    if (meridiem === "pm") hour += 12
    return `${padTwo(hour)}:${padTwo(minute)}`
  }

  const h24 = H24_MATCH_SCHEMA.parse(lower.match(H24_REGEX))
  if (h24 !== null) {
    const hourStr = h24[1]
    const minuteStr = h24[2]
    if (hourStr === undefined || minuteStr === undefined) return null
    const hour = Number(hourStr)
    const minute = Number(minuteStr)
    if (hour < 0 || hour > 23) return null
    if (minute < 0 || minute > 59) return null
    return `${padTwo(hour)}:${padTwo(minute)}`
  }

  return null
}
