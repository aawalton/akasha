import { denverOffsetMs } from "akasha/alan/harness/day/us-zone-offset/us-zone-offset.module.code.ts"

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n)
}

export function mtWallToInstant(dayStr: string, hh: number, mm: number): Date {
  const [y, m, d] = dayStr.split("-").map(Number)
  if (y === undefined || m === undefined || d === undefined) {
    return new Date(Number.NaN)
  }
  const wallAsUtcMs = Date.UTC(y, m - 1, d, hh, mm, 0, 0)
  const estimatedOffset = denverOffsetMs(wallAsUtcMs)
  const candidateMs = wallAsUtcMs - estimatedOffset
  const realOffset = denverOffsetMs(candidateMs)
  return new Date(realOffset === estimatedOffset ? candidateMs : wallAsUtcMs - realOffset)
}

export function mtWallHm(instant: Date): string {
  const ms = instant.getTime()
  const shifted = new Date(ms + denverOffsetMs(ms))
  return `${pad2(shifted.getUTCHours())}:${pad2(shifted.getUTCMinutes())}`
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
