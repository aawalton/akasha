import { dayStrOf } from "akasha/alan/harness/day-boundary/modules/day-string/day-string.module.code.ts"
import { denverOffsetMs } from "akasha/alan/harness/day-boundary/modules/us-zone-offset/us-zone-offset.computed-property-module.code.ts"

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
