import type { SetLine } from "./history-core"

export type Trend = "improving" | "declining" | "flat" | "insufficient"

export function progressionTarget(best: SetLine | null): string | null {
  if (best === null || best.weight === null) return null
  const reps = best.reps ?? 0
  return `${best.weight} × ${reps + 1} (beat best ${best.weight}×${reps})`
}

export function mobilityTrend(valuesOldestFirst: readonly number[]): Trend {
  if (valuesOldestFirst.length < 2) return "insufficient"
  const first = valuesOldestFirst[0]
  const last = valuesOldestFirst[valuesOldestFirst.length - 1]
  if (first === undefined || last === undefined) return "insufficient"
  if (last > first) return "improving"
  if (last < first) return "declining"
  return "flat"
}

export interface DigestEquipment {
  readonly title: string
  readonly category: string | null
  readonly configuration: string | null
  readonly loads: string | null
  readonly available: boolean
  readonly notes: string | null
}

export interface DigestMovement {
  readonly id: string
  readonly name: string
  readonly last: SetLine | null
  readonly best: SetLine | null
  readonly target: string | null
}

export interface DigestSession {
  readonly id: string
  readonly date: string | null
  readonly totalVolume: number
  readonly movements: readonly string[]
}

export interface DigestMobility {
  readonly metric: string
  readonly side: string | null
  readonly latestText: string | null
  readonly latestNum: number | null
  readonly date: string | null
  readonly readingCount: number
  readonly trend: Trend
}

export interface DigestConstraint {
  readonly title: string
  readonly kind: string | null
  readonly body: string | null
  readonly focusTags: readonly string[]
}

export interface DigestFocusRecency {
  readonly focus: string
  readonly lastTrained: string | null
}

export interface DigestResult {
  readonly date: string
  readonly focus: string | null
  readonly bodyweight: number
  readonly equipment: readonly DigestEquipment[]
  readonly lastTrainedByFocus: readonly DigestFocusRecency[]
  readonly movements: readonly DigestMovement[]
  readonly lastSession: DigestSession | null
  readonly mobility: readonly DigestMobility[]
  readonly constraints: readonly DigestConstraint[]
}
