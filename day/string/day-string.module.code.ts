import { padTwo } from "@akasha/digit-padding"

export const MS_PER_DAY = 86_400_000

export const NOON = 12

export function pad2(n: number): string {
  return padTwo(n)
}

export function dayStrOf(at: Date): string {
  return `${at.getUTCFullYear()}-${pad2(at.getUTCMonth() + 1)}-${pad2(at.getUTCDate())}`
}

export function parseDay(dayStr: string): readonly [number, number, number] | null {
  const [y, m, d] = dayStr.split("-").map(Number)
  if (y === undefined || m === undefined || d === undefined) return null
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return null
  return [y, m, d]
}

export function dayAfter(dayStr: string): string {
  const parsed = parseDay(dayStr)
  if (parsed === null) return dayStr
  const [y, m, d] = parsed
  return dayStrOf(new Date(Date.UTC(y, m - 1, d, NOON, 0, 0, 0) + MS_PER_DAY))
}
