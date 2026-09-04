import { dayAfter, dayStrOf, MS_PER_DAY, NOON } from "../string/day-string.module.code.ts"
import { nyOffsetMs } from "../us-zone-offset/us-zone-offset.module.code.ts"

export function getEsoResetTime(now: Date): Date {
  const nowMs = now.getTime()
  const offset = nyOffsetMs(nowMs)
  const shifted = new Date(nowMs + offset)
  const year = shifted.getUTCFullYear()
  const month = shifted.getUTCMonth()
  const day = shifted.getUTCDate()
  const hour = shifted.getUTCHours()
  const candidateNyMs = Date.UTC(year, month, day, 6, 0, 0, 0)
  let resetMs = candidateNyMs - offset
  if (hour < 6 || resetMs > nowMs) {
    const earlierMs = nowMs - MS_PER_DAY
    const earlierOffset = nyOffsetMs(earlierMs)
    const earlierShifted = new Date(earlierMs + earlierOffset)
    const ey = earlierShifted.getUTCFullYear()
    const em = earlierShifted.getUTCMonth()
    const ed = earlierShifted.getUTCDate()
    const earlierCandidateNyMs = Date.UTC(ey, em, ed, 6, 0, 0, 0)
    resetMs = earlierCandidateNyMs - earlierOffset
  }
  return new Date(resetMs)
}

export function getEsoDayStr(now: Date): string {
  const nowMs = now.getTime()
  const offset = nyOffsetMs(nowMs)
  const shifted = new Date(nowMs + offset)
  const hour = shifted.getUTCHours()
  if (hour < 6) {
    const earlierMs = nowMs - MS_PER_DAY
    return dayStrOf(new Date(earlierMs + nyOffsetMs(earlierMs)))
  }
  return dayStrOf(shifted)
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

function esoResetInstantForDay(dayStr: string): number | undefined {
  const [y, m, d] = dayStr.split("-").map(Number)
  if (
    y === undefined ||
    m === undefined ||
    d === undefined ||
    Number.isNaN(y) ||
    Number.isNaN(m) ||
    Number.isNaN(d)
  ) {
    return undefined
  }
  const candidateNyMs = Date.UTC(y, m - 1, d, 6, 0, 0, 0)
  const approx = candidateNyMs - nyOffsetMs(candidateNyMs)
  return candidateNyMs - nyOffsetMs(approx)
}

export function getEsoDayWindow(dayStr: string): { start: Date; end: Date } {
  const startMs = esoResetInstantForDay(dayStr)
  if (startMs === undefined) {
    return { start: new Date(0), end: new Date(0) }
  }
  const endMs = esoResetInstantForDay(dayAfter(dayStr))
  if (endMs === undefined) {
    return { start: new Date(0), end: new Date(0) }
  }
  return { start: new Date(startMs), end: new Date(endMs) }
}

export function diffEsoDays(later: string, earlier: string): number {
  const [ly, lm, ld] = later.split("-").map(Number)
  const [ey, em, ed] = earlier.split("-").map(Number)
  if (
    ly === undefined ||
    lm === undefined ||
    ld === undefined ||
    ey === undefined ||
    em === undefined ||
    ed === undefined ||
    Number.isNaN(ly) ||
    Number.isNaN(lm) ||
    Number.isNaN(ld) ||
    Number.isNaN(ey) ||
    Number.isNaN(em) ||
    Number.isNaN(ed)
  ) {
    return 0
  }
  const laterMs = Date.UTC(ly, lm - 1, ld)
  const earlierMs = Date.UTC(ey, em - 1, ed)
  return Math.round((laterMs - earlierMs) / MS_PER_DAY)
}
