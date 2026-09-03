import type { PerformedSet } from "../performed-set/performed-set.module.code.ts"

export type ProgressionAction = "introduce" | "beat-reps" | "increase-load" | "hold-extend-reps"

export type ProgressionInput = {
  readonly lastSessionSets: readonly PerformedSet[]
  readonly repRangeLow: number
  readonly repRangeHigh: number
  readonly targetSets: number
  readonly loadsLadder: readonly number[]
}

export type ProgressionDecision = {
  readonly action: ProgressionAction
  readonly prescribedLoad: number | null
  readonly prescribedRepLow: number
  readonly prescribedRepHigh: number
  readonly prescribedSets: number
  readonly coarseJumpGuardFired: boolean
  readonly rationale: string
}

const REP_EXTENSION = 2

function modalLoad(sets: readonly PerformedSet[]): number | null {
  const counts = new Map<number, number>()
  for (const set of sets) {
    if (set.weight === null) continue
    counts.set(set.weight, (counts.get(set.weight) ?? 0) + 1)
  }
  let best: number | null = null
  let bestCount = 0
  for (const [load, count] of counts) {
    if (count > bestCount || (count === bestCount && (best === null || load > best))) {
      best = load
      bestCount = count
    }
  }
  return best
}

function nextLadderStep(ladder: readonly number[], current: number): number | undefined {
  let next: number | undefined
  for (const step of ladder) {
    if (step > current && (next === undefined || step < next)) next = step
  }
  return next
}

function holdExtend(
  load: number | null,
  input: ProgressionInput,
  addSet: boolean,
  rationale: string
): ProgressionDecision {
  return {
    action: "hold-extend-reps",
    prescribedLoad: load,
    prescribedRepLow: input.repRangeHigh,
    prescribedRepHigh: input.repRangeHigh + REP_EXTENSION,
    prescribedSets: addSet ? input.targetSets + 1 : input.targetSets,
    coarseJumpGuardFired: true,
    rationale,
  }
}

export function decideProgression(input: ProgressionInput): ProgressionDecision {
  const { lastSessionSets, repRangeLow, repRangeHigh, targetSets, loadsLadder } = input
  const working = lastSessionSets.filter((set) => (set.reps ?? 0) > 0)

  if (working.length === 0) {
    return {
      action: "introduce",
      prescribedLoad: null,
      prescribedRepLow: repRangeLow,
      prescribedRepHigh: repRangeHigh,
      prescribedSets: targetSets,
      coarseJumpGuardFired: false,
      rationale: `No logged history — introduce at ${repRangeLow}-${repRangeHigh} reps; select a load allowing the range at RIR target`,
    }
  }

  const currentLoad = modalLoad(working)
  const atLoad =
    currentLoad === null ? working : working.filter((set) => set.weight === currentLoad)
  const reps = atLoad.map((set) => set.reps ?? 0)
  const minReps = Math.min(...reps)
  const maxReps = Math.max(...reps)
  const loadSaid = currentLoad === null ? "bodyweight" : `${currentLoad}`

  if (minReps < repRangeHigh) {
    const target = Math.min(maxReps + 1, repRangeHigh)
    return {
      action: "beat-reps",
      prescribedLoad: currentLoad,
      prescribedRepLow: repRangeLow,
      prescribedRepHigh: repRangeHigh,
      prescribedSets: targetSets,
      coarseJumpGuardFired: false,
      rationale: `Last ${loadSaid}×${maxReps} — hold load, beat ${maxReps}→${target} toward ${repRangeHigh} (range ${repRangeLow}-${repRangeHigh})`,
    }
  }

  if (currentLoad === null) {
    return holdExtend(
      null,
      input,
      true,
      `Bodyweight and top of range reached (${repRangeHigh}) — extend reps to ${repRangeHigh + REP_EXTENSION} / add a set`
    )
  }

  const nextLoad = nextLadderStep(loadsLadder, currentLoad)
  if (nextLoad === undefined) {
    return holdExtend(
      currentLoad,
      input,
      true,
      `At load ceiling (${currentLoad}, no heavier increment) — hold load, extend reps to ${repRangeHigh + REP_EXTENSION} / add a set; surface the heavier-implement decision`
    )
  }

  const estimatedRepsAtNext = Math.floor((repRangeHigh * currentLoad) / nextLoad)
  if (estimatedRepsAtNext < repRangeLow) {
    return holdExtend(
      currentLoad,
      input,
      false,
      `Next increment ${nextLoad} would drop to ~${estimatedRepsAtNext} reps (< range floor ${repRangeLow}) — coarse-jump guard: hold ${currentLoad}, extend reps to ${repRangeHigh + REP_EXTENSION}`
    )
  }

  return {
    action: "increase-load",
    prescribedLoad: nextLoad,
    prescribedRepLow: repRangeLow,
    prescribedRepHigh: repRangeHigh,
    prescribedSets: targetSets,
    coarseJumpGuardFired: false,
    rationale: `All sets hit ${repRangeHigh} at ${currentLoad} — add load ${currentLoad}→${nextLoad}, reset to ${repRangeLow} reps`,
  }
}
