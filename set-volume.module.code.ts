export interface VolumeSetInput {
  readonly reps: number | undefined
  readonly weight: number | undefined
  readonly isWarmup: boolean | undefined
  readonly activityType: string | undefined
  readonly loadFactor: number | undefined
  readonly implementCount: number | undefined
}

function isStrengthWork(set: VolumeSetInput): boolean {
  if (set.isWarmup === true) return false
  const activity = set.activityType
  return activity === undefined || activity === "strength"
}

export function setVolume(set: VolumeSetInput, bodyweight: number | undefined): number {
  if (!isStrengthWork(set)) return 0
  const loadPerRep =
    (set.weight ?? 0) * (set.implementCount ?? 1) + (set.loadFactor ?? 0) * (bodyweight ?? 0)
  return loadPerRep * (set.reps ?? 0)
}

export function computeSessionVolume(
  sets: readonly VolumeSetInput[],
  bodyweight: number | undefined
): number {
  const total = sets.reduce((sum, set) => sum + setVolume(set, bodyweight), 0)
  return Math.round(total)
}
