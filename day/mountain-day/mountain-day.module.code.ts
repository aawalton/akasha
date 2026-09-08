import { dayStrOf } from "../string/day-string.module.code.ts"
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
  const shifted = new Date(nowMs + denverOffsetMs(nowMs))
  const back = shifted.getUTCHours() < 6 ? 1 : 0
  return dayStrOf(
    new Date(Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate() - back))
  )
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
