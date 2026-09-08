import { readMountainWallTime } from "./mountain-wall.module.code.ts"

export const MS_PER_HOUR = 3_600_000
export const HALF_HOUR_MS = 1_800_000
export const AT_0800_MST = new Date("2026-01-15T15:00:00Z")
export const AT_1002_MST = new Date("2026-01-15T17:02:00Z")
export const AT_2000_MST = new Date("2026-01-16T03:00:00Z")
export const AT_0330_MDT_SPRING = new Date("2026-03-08T09:30:00Z")
export const AT_0830_MDT_SPRING = new Date("2026-03-08T14:30:00Z")
export const AT_0200_MST_AUTUMN = new Date("2026-11-01T09:00:00Z")
export const AT_0930_MST_AUTUMN = new Date("2026-11-01T16:30:00Z")

export function instantOf(said: string, now: Date): string {
  const reading = readMountainWallTime(said, now)
  if (reading.read !== "instant") throw new Error(`refused instead: ${reading.saying}`)
  return reading.iso
}

export function refusalOf(said: string, now: Date): { because: string; saying: string } {
  const reading = readMountainWallTime(said, now)
  if (reading.read !== "refused") throw new Error(`read instead as ${reading.iso}`)
  return { because: reading.because, saying: reading.saying }
}

export function denverSaid(iso: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Denver",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
  const read = Object.fromEntries(
    parts.formatToParts(new Date(iso)).map((one) => [one.type, one.value])
  )
  const hour = read.hour === "24" ? "00" : (read.hour as string)
  return `${read.year}-${read.month}-${read.day} ${hour}:${read.minute}`
}

export function denverSaidAt(ms: number): string {
  return denverSaid(new Date(ms).toISOString())
}

export function halfHoursAcrossTheTurns(): readonly number[] {
  const out: number[] = []
  for (const base of [Date.UTC(2026, 2, 6), Date.UTC(2026, 9, 30)]) {
    for (let step = 0; step < 5 * 48; step++) out.push(base + step * HALF_HOUR_MS)
  }
  return out
}

export const JUNK_NO_TIME_READS = [
  "99:99",
  "24:00",
  "later",
  "",
  "   ",
  "2026-13-45",
  "2026-13-45 07:00",
  "0000-00-00 00:00",
  "nope+01:00",
  "-",
  "::",
  "7:3",
  "1e9",
  "2026-02-30T07:00",
] as const
