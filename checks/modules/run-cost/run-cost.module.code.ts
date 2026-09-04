import { readFileSync } from "node:fs"

export const BANDS = [
  "instant",
  "fast",
  "lagging",
  "slow",
  "painful",
  "torture",
  "eternal",
] as const

export type Band = (typeof BANDS)[number]

export const CEILING_MS: Readonly<Record<Band, number>> = {
  instant: 1_000,
  fast: 5_000,
  lagging: 15_000,
  slow: 60_000,
  painful: 300_000,
  torture: 900_000,
  eternal: Number.POSITIVE_INFINITY,
}

export function looser(band: Band): Band {
  const at = BANDS.indexOf(band)
  return BANDS[Math.min(at + 1, BANDS.length - 1)] ?? band
}

const TICKS_PER_SECOND = 100

const AFTER_COMM = 2

const SELF_AND_REAPED = [11, 12, 13, 14]

export function cpuMs(): number {
  const stat = readFileSync("/proc/self/stat", "utf8")
  const fields = stat.slice(stat.lastIndexOf(")") + AFTER_COMM).split(" ")
  const ticks = SELF_AND_REAPED.reduce((sum, at) => sum + Number(fields[at] ?? 0), 0)
  return (ticks / TICKS_PER_SECOND) * 1000
}

export function seconds(ms: number): string {
  return Number.isFinite(ms) ? `${(ms / 1000).toFixed(2)}s` : "no ceiling"
}
