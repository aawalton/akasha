import { dayStrOf, MS_PER_DAY } from "../string/day-string.module.code.ts"
import { denverOffsetMs } from "../us-zone-offset/us-zone-offset.module.code.ts"

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
    return dayStrOf(new Date(earlierMs + denverOffsetMs(earlierMs)))
  }
  return dayStrOf(shifted)
}

export function getMountainEveningDayStr(now: Date): string {
  const nowMs = now.getTime()
  const offset = denverOffsetMs(nowMs)
  const shifted = new Date(nowMs + offset)
  const dayOffset = shifted.getUTCHours() >= 18 ? 1 : 0
  return dayStrOf(
    new Date(
      Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate() + dayOffset)
    )
  )
}
