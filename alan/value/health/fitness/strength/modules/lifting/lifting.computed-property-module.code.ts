type Lift = {
  readonly weight: number
  readonly implementCount: number
  readonly loadFactor: number
  readonly bodyweight: number
  readonly reps: number
}

export function liftedIn(one: Lift): number {
  return (one.weight * one.implementCount + one.loadFactor * one.bodyweight) * one.reps
}
