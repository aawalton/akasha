import type { Rung } from "../tier/readout-tier.module.code.ts"

const HOUR_MS = 60 * 60 * 1000

const AT_MOST_MS = 8.64e15

export function rungUnder(reading: number, rungs: readonly Rung[]): number | null {
  let under: number | null = null
  for (const rung of rungs) {
    if (rung.at >= reading) continue
    if (under === null || rung.at > under) under = rung.at
  }
  return under
}

export function fallsPastAt(
  reading: number,
  fallsPerHour: number,
  takenAt: string,
  rungs: readonly Rung[]
): string | null {
  if (!Number.isFinite(reading)) return null
  if (!Number.isFinite(fallsPerHour) || fallsPerHour <= 0) return null

  const under = rungUnder(reading, rungs)
  if (under === null) return null

  const took = Date.parse(takenAt)
  if (Number.isNaN(took)) return null

  const at = took + ((reading - under) / fallsPerHour) * HOUR_MS
  if (!Number.isFinite(at) || Math.abs(at) > AT_MOST_MS) return null
  return new Date(at).toISOString()
}
