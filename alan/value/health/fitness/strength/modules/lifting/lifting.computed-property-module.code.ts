type Lift = {
  readonly weight: number
  readonly implementCount: number
  readonly loadFactor: number
  readonly bodyweight: number
  readonly reps: number
  readonly assisted: boolean
}

export function liftedIn(one: Lift): number {
  const held = one.weight * one.implementCount
  const carried = one.loadFactor * one.bodyweight
  return (one.assisted ? carried - held : held + carried) * one.reps
}
