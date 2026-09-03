import type { SetLine } from "../set-history/set-history.module.code.ts"

export interface SetTarget {
  readonly weight: number
  readonly reps: number
  readonly beatWeight: number
  readonly beatReps: number
}

export function targetPast(best: SetLine | null): SetTarget | null {
  if (best === null || best.weight === null) return null
  const reps = best.reps ?? 0
  return { weight: best.weight, reps: reps + 1, beatWeight: best.weight, beatReps: reps }
}

export function targetSaid(target: SetTarget | null): string | null {
  if (target === null) return null
  return `${target.weight} × ${target.reps} (beat best ${target.beatWeight}×${target.beatReps})`
}
