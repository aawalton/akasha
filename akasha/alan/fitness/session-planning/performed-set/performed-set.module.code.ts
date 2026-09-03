import type { IsWarmup } from "../../set-logs/properties/is-warmup.boolean-property.ts"
import type { Reps } from "../../set-logs/properties/reps.number-property.ts"
import type { Rpe } from "../../set-logs/properties/rpe.number-property.ts"
import type { SetNumber } from "../../set-logs/properties/set-number.number-property.ts"
import type { Weight } from "../../set-logs/properties/weight.number-property.ts"
import type { WorkoutSessionDate } from "../../workout-sessions/properties/workout-session-date.calendar-date-property.ts"

export type PerformedSet = {
  readonly day: WorkoutSessionDate | null
  readonly setNumber: SetNumber | null
  readonly reps: Reps | null
  readonly weight: Weight | null
  readonly rpe: Rpe | null
  readonly isWarmup: IsWarmup
}

export function isWorkingSet(set: PerformedSet): boolean {
  return !set.isWarmup && (set.reps ?? 0) > 0
}
