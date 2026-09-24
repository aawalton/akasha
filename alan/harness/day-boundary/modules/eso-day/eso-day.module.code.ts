import {
  dayAfter,
  dayStrOf,
  MS_PER_DAY,
  NOON,
} from "akasha/alan/harness/day-boundary/modules/day-string/day-string.module.code.ts"
import { nyOffsetMs } from "akasha/alan/harness/day-boundary/modules/us-zone-offset/us-zone-offset.computed-property-module.code.ts"

export function getEsoResetTime(now: Date): Date {
  return getEsoDayWindow(getEsoDayStr(now)).start
}

export function getEsoDayStr(now: Date): string {
  const nowMs = now.getTime()
  const shifted = new Date(nowMs + nyOffsetMs(nowMs))
  const back = shifted.getUTCHours() < 6 ? 1 : 0
  return dayStrOf(
    new Date(Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate() - back))
  )
}

export function getEsoDayStrAt(at: string): string {
  return getEsoDayStr(new Date(at))
}

export function getEsoDayAnchor(now: Date): Date {
  const base = getEsoDayStr(now)
  const [y, m, d] = base.split("-").map(Number)
  if (y === undefined || m === undefined || d === undefined) {
    return now
  }
  return new Date(Date.UTC(y, m - 1, d, NOON, 0, 0, 0))
}

export function getEsoDayStrOffset(now: Date, daysOffset: number): string {
  const anchor = getEsoDayAnchor(now)
  return dayStrOf(new Date(anchor.getTime() + daysOffset * MS_PER_DAY))
}

const DAY_FORM = /^\d{4}-\d{2}-\d{2}$/

function calendarDayOf(dayStr: string): readonly [number, number, number] {
  const [y, m, d] = dayStr.split("-").map(Number)
  if (DAY_FORM.test(dayStr) && y !== undefined && m !== undefined && d !== undefined) {
    const at = new Date(Date.UTC(y, m - 1, d))
    if (at.getUTCFullYear() === y && at.getUTCMonth() === m - 1 && at.getUTCDate() === d) {
      return [y, m, d]
    }
  }
  throw new Error(`'${dayStr}' is no real date written YYYY-MM-DD, so it names no ESO day`)
}

function esoResetInstantForDay(dayStr: string): number {
  const [y, m, d] = calendarDayOf(dayStr)
  const candidateNyMs = Date.UTC(y, m - 1, d, 6, 0, 0, 0)
  const approx = candidateNyMs - nyOffsetMs(candidateNyMs)
  return candidateNyMs - nyOffsetMs(approx)
}

export function getEsoDayWindow(dayStr: string): { start: Date; end: Date } {
  const startMs = esoResetInstantForDay(dayStr)
  const endMs = esoResetInstantForDay(dayAfter(dayStr))
  return { start: new Date(startMs), end: new Date(endMs) }
}

export function diffEsoDays(later: string, earlier: string): number {
  const [ly, lm, ld] = calendarDayOf(later)
  const [ey, em, ed] = calendarDayOf(earlier)
  const laterMs = Date.UTC(ly, lm - 1, ld)
  const earlierMs = Date.UTC(ey, em - 1, ed)
  return Math.round((laterMs - earlierMs) / MS_PER_DAY)
}
