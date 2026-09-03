export type SetLine = {
  readonly date: string | null
  readonly setNumber: number | null
  readonly reps: number | null
  readonly weight: number | null
  readonly rpe: number | null
  readonly isWarmup?: boolean
}

export type Trend = "improving" | "declining" | "flat" | "insufficient"

const FEWEST_FOR_A_TREND = 2

export function bestSet(lines: readonly SetLine[]): SetLine | null {
  let best: SetLine | null = null
  for (const line of lines) {
    if (line.weight === null) continue
    if (
      best === null ||
      best.weight === null ||
      line.weight > best.weight ||
      (line.weight === best.weight && (line.reps ?? 0) > (best.reps ?? 0))
    ) {
      best = line
    }
  }
  return best
}

export function lastWorkingSet(newestFirst: readonly SetLine[]): SetLine | null {
  for (const line of newestFirst) {
    if (line.isWarmup === true) continue
    return line
  }
  return null
}

export function progressionTarget(best: SetLine | null): string | null {
  if (best === null || best.weight === null) return null
  const reps = best.reps ?? 0
  return `${best.weight} × ${reps + 1} (beat best ${best.weight}×${reps})`
}

export function mobilityTrend(oldestFirst: readonly number[]): Trend {
  if (oldestFirst.length < FEWEST_FOR_A_TREND) return "insufficient"
  const first = oldestFirst[0]
  const last = oldestFirst[oldestFirst.length - 1]
  if (first === undefined || last === undefined) return "insufficient"
  if (last > first) return "improving"
  if (last < first) return "declining"
  return "flat"
}
