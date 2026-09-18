import { denverInstantMs } from "akasha/alan/harness/day-boundary/modules/us-zone-offset/us-zone-offset.computed-property-module.code.ts"
import { hoursBetween } from "akasha/alan/track/daily/day/modules/hours-between/hours-between.computed-property-module.code.ts"

const AN_HOUR = 3600000

const A_DAY = 1

const SAYS_A_DATE = /^(\d{4})-(\d{2})-(\d{2})$/

function midnightEnding(date: unknown): number | null {
  if (typeof date !== "string") return null
  const said = SAYS_A_DATE.exec(date)
  if (said === null) return null
  const year = Number(said[1] ?? "")
  const month = Number(said[2] ?? "")
  const day = Number(said[3] ?? "")
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null
  return denverInstantMs(Date.UTC(year, month - 1, day + A_DAY))
}

export function openUntil(date: unknown, now: Date = new Date()): string {
  const ends = midnightEnding(date)
  const at = ends === null ? now.getTime() : Math.min(now.getTime(), ends)
  return new Date(at).toISOString()
}

export function stretchHours(startTime: unknown, endTime: unknown, until: string): number | null {
  const ran = hoursBetween(startTime, endTime)
  if (ran !== null) return ran
  if (typeof startTime !== "string") return null
  const from = Date.parse(startTime)
  const to = Date.parse(until)
  if (Number.isNaN(from) || Number.isNaN(to)) return null
  return Math.max(0, to - from) / AN_HOUR
}
