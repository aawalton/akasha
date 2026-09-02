import { pad2 } from "../string/day-string.module.code.ts"
import { nyOffsetMs } from "../us-zone-offset/us-zone-offset.module.code.ts"

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
