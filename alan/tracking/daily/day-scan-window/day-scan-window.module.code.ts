import { getEsoDayStrOffset as esoDayStrOffset } from "@akasha/day/eso-day"

export const SOURCE_POINTS_FIELD = "sourcePoints"

export const WRITER = "daily-tracking"

export const TRACKING_SCAN_DAYS = 14

export const TRACKING_SCAN_DAY_OFFSETS: readonly number[] = Array.from(
  { length: TRACKING_SCAN_DAYS },
  (_, index) => index - (TRACKING_SCAN_DAYS - 1)
)

export function trackingScanFloorDayStr(now: Date): string {
  return esoDayStrOffset(now, -(TRACKING_SCAN_DAYS - 1))
}

export function kebabKey(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}

export function numberOf(value: unknown): number | undefined {
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined
  if (typeof value !== "string") return undefined
  const trimmed = value.trim()
  if (trimmed === "") return undefined
  const parsed = Number(trimmed)
  return Number.isFinite(parsed) ? parsed : undefined
}

export function textOf(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined
}
