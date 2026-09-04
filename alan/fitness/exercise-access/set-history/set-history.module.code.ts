export interface SetLine {
  readonly date: string | null
  readonly setNumber: number | null
  readonly reps: number | null
  readonly weight: number | null
  readonly rpe: number | null
  readonly isWarmup?: boolean
}

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

export function lastWorkingSet(lines: readonly SetLine[]): SetLine | null {
  for (const line of lines) {
    if (line.isWarmup === true) continue
    return line
  }
  return null
}
