const MS_PER_DAY = 86_400_000
const MS_PER_HOUR = 3_600_000

function nthWeekdayOfMonth(year: number, month: number, targetDow: number, n: number): number {
  const dowOfFirst = new Date(Date.UTC(year, month, 1)).getUTCDay()
  return 1 + ((targetDow - dowOfFirst + 7) % 7) + (n - 1) * 7
}

function springTransitionMs(year: number): number {
  const day = nthWeekdayOfMonth(year, 2, 0, 2)
  return Date.UTC(year, 2, day, 7, 0, 0, 0)
}

function fallTransitionMs(year: number): number {
  const day = nthWeekdayOfMonth(year, 10, 0, 1)
  return Date.UTC(year, 10, day, 6, 0, 0, 0)
}

function nyOffsetMs(instantMs: number): number {
  const year = new Date(instantMs).getUTCFullYear()
  const spring = springTransitionMs(year)
  const fall = fallTransitionMs(year)
  const isEdt = instantMs >= spring && instantMs < fall
  return isEdt ? -4 * MS_PER_HOUR : -5 * MS_PER_HOUR
}

function denverOffsetMs(instantMs: number): number {
  const year = new Date(instantMs).getUTCFullYear()
  const spring = springTransitionMs(year)
  const fall = fallTransitionMs(year)
  const isMdt = instantMs >= spring && instantMs < fall
  return isMdt ? -6 * MS_PER_HOUR : -7 * MS_PER_HOUR
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n)
}

function nyDateStr(instantMs: number, offset: number): string {
  const shifted = new Date(instantMs + offset)
  return `${shifted.getUTCFullYear()}-${pad2(shifted.getUTCMonth() + 1)}-${pad2(shifted.getUTCDate())}`
}

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
    const earlierOffset = nyOffsetMs(earlierMs)
    return nyDateStr(earlierMs, earlierOffset)
  }
  return nyDateStr(nowMs, offset)
}

export function getEsoDayAnchor(now: Date): Date {
  const base = getEsoDayStr(now)
  const [y, m, d] = base.split("-").map(Number)
  if (y === undefined || m === undefined || d === undefined) {
    return now
  }
  return new Date(Date.UTC(y, m - 1, d, 12, 0, 0, 0))
}

export function getEsoDayStrOffset(now: Date, daysOffset: number): string {
  const anchor = getEsoDayAnchor(now)
  const shifted = new Date(anchor.getTime() + daysOffset * MS_PER_DAY)
  return `${shifted.getUTCFullYear()}-${pad2(shifted.getUTCMonth() + 1)}-${pad2(shifted.getUTCDate())}`
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
  const [y, m, d] = dayStr.split("-").map(Number)
  if (startMs === undefined || y === undefined || m === undefined || d === undefined) {
    return { start: new Date(0), end: new Date(0) }
  }
  const nextDayAnchor = new Date(Date.UTC(y, m - 1, d + 1, 12, 0, 0, 0))
  const nextDayStr = `${nextDayAnchor.getUTCFullYear()}-${pad2(nextDayAnchor.getUTCMonth() + 1)}-${pad2(nextDayAnchor.getUTCDate())}`
  const endMs = esoResetInstantForDay(nextDayStr)
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

export function nyWallToInstant(dayStr: string, hh: number, mm: number): Date {
  const [y, m, d] = dayStr.split("-").map(Number)
  if (y === undefined || m === undefined || d === undefined) {
    return new Date(Number.NaN)
  }
  const wallAsUtcMs = Date.UTC(y, m - 1, d, hh, mm, 0, 0)
  const estimatedOffset = nyOffsetMs(wallAsUtcMs)
  const candidateMs = wallAsUtcMs - estimatedOffset
  const realOffset = nyOffsetMs(candidateMs)
  return new Date(realOffset === estimatedOffset ? candidateMs : wallAsUtcMs - realOffset)
}

export function nyWallHm(instant: Date): string {
  const ms = instant.getTime()
  const shifted = new Date(ms + nyOffsetMs(ms))
  return `${pad2(shifted.getUTCHours())}:${pad2(shifted.getUTCMinutes())}`
}

export function getDenverDayEnd(now: Date): Date {
  const nowMs = now.getTime()
  const offset = denverOffsetMs(nowMs)
  const shifted = new Date(nowMs + offset)
  const year = shifted.getUTCFullYear()
  const month = shifted.getUTCMonth()
  const day = shifted.getUTCDate()
  const nextMidnightWallMs = Date.UTC(year, month, day + 1, 0, 0, 0, 0)
  const estimatedMs = nextMidnightWallMs - offset
  const realOffset = denverOffsetMs(estimatedMs)
  return new Date(realOffset === offset ? estimatedMs : nextMidnightWallMs - realOffset)
}

export function getMountainMorningDayStr(now: Date): string {
  const nowMs = now.getTime()
  const offset = denverOffsetMs(nowMs)
  const shifted = new Date(nowMs + offset)
  const hour = shifted.getUTCHours()
  if (hour < 6) {
    const earlierMs = nowMs - MS_PER_DAY
    const earlierOffset = denverOffsetMs(earlierMs)
    const earlierShifted = new Date(earlierMs + earlierOffset)
    return `${earlierShifted.getUTCFullYear()}-${pad2(earlierShifted.getUTCMonth() + 1)}-${pad2(earlierShifted.getUTCDate())}`
  }
  return `${shifted.getUTCFullYear()}-${pad2(shifted.getUTCMonth() + 1)}-${pad2(shifted.getUTCDate())}`
}

export function getMountainEveningDayStr(now: Date): string {
  const nowMs = now.getTime()
  const offset = denverOffsetMs(nowMs)
  const shifted = new Date(nowMs + offset)
  const dayOffset = shifted.getUTCHours() >= 18 ? 1 : 0
  const labeled = new Date(
    Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate() + dayOffset)
  )
  return `${labeled.getUTCFullYear()}-${pad2(labeled.getUTCMonth() + 1)}-${pad2(labeled.getUTCDate())}`
}
