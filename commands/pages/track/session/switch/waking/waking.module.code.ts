import {
  dayStrOf,
  MS_PER_DAY,
  parseDay,
} from "akasha/alan/harness/day/string/day-string.module.code.ts"
import { nyOffsetMs } from "akasha/alan/harness/day/us-zone-offset/us-zone-offset.module.code.ts"

const SLEEP = "sleep"

const EVENING_HOUR = 18

export function dayBefore(day: string): string {
  const parts = parseDay(day)
  if (parts === null) return day
  const [year, month, at] = parts
  return dayStrOf(new Date(Date.UTC(year, month - 1, at) - MS_PER_DAY))
}

export function sleeping(title: string): boolean {
  return title.trim().toLowerCase() === SLEEP
}

export function opensInto(started: string): string {
  const ms = new Date(started).getTime()
  if (Number.isNaN(ms)) return started
  const shifted = new Date(ms + nyOffsetMs(ms))
  const forward = shifted.getUTCHours() >= EVENING_HOUR ? 1 : 0
  return dayStrOf(
    new Date(
      Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate() + forward)
    )
  )
}
