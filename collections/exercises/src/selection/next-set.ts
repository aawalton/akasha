import type { PlannedSlot, SessionPlan } from "./selector"

export interface SessionSet {
  readonly setNumber: number
  readonly reps: number | null
  readonly rpe: number | null
}

export const HIGH_RPE_THRESHOLD = 9

export type MovementEndReason =
  | "sets-complete"
  | "high-rpe"
  | "reps-below-range"
  | "skipped-after-performing"

export interface MovementDoneInput {
  readonly sets: readonly SessionSet[]
  readonly prescribedSets: number
  readonly repRangeLow: number
  readonly skippedAfterPerforming: boolean
}

export interface MovementDoneDecision {
  readonly done: boolean
  readonly reason: MovementEndReason | null
  readonly why: string
}

const NOT_DONE: MovementDoneDecision = { done: false, reason: null, why: "" }

export function decideMovementDone(input: MovementDoneInput): MovementDoneDecision {
  const { sets, prescribedSets, repRangeLow, skippedAfterPerforming } = input
  const last = sets[sets.length - 1]
  if (last !== undefined && sets.length >= prescribedSets) {
    return { done: true, reason: "sets-complete", why: `${sets.length} prescribed sets complete` }
  }
  if (skippedAfterPerforming) {
    return {
      done: true,
      reason: "skipped-after-performing",
      why: "skipped after work already logged",
    }
  }
  if (last === undefined) return NOT_DONE
  if (last.rpe !== null && last.rpe >= HIGH_RPE_THRESHOLD) {
    return {
      done: true,
      reason: "high-rpe",
      why: `last set came in at RPE ${last.rpe} (RIR ≤ 1)`,
    }
  }
  if (last.reps !== null && last.reps < repRangeLow) {
    return {
      done: true,
      reason: "reps-below-range",
      why: `last set dropped to ${last.reps} reps, below the ${repRangeLow} floor`,
    }
  }
  return NOT_DONE
}

export interface SkipPartition {
  readonly toExclude: ReadonlySet<string>
  readonly afterPerforming: ReadonlySet<string>
}

export function partitionSkips(
  skipped: ReadonlySet<string>,
  sessionPerformed: ReadonlySet<string>
): SkipPartition {
  const toExclude = new Set<string>()
  const afterPerforming = new Set<string>()
  for (const id of skipped) {
    if (sessionPerformed.has(id)) afterPerforming.add(id)
    else toExclude.add(id)
  }
  return { toExclude, afterPerforming }
}

export interface NextSetInput {
  readonly plan: SessionPlan
  readonly loggedByExercise: ReadonlyMap<string, readonly SessionSet[]>
  readonly skippedAfterPerforming: ReadonlySet<string>
}

export interface NextSet {
  readonly kind: "set"
  readonly slot: PlannedSlot
  readonly setNumber: number
  readonly why: string
}

export interface SessionComplete {
  readonly kind: "done"
  readonly why: string
}

export type NextSetDecision = NextSet | SessionComplete

export function decideNextSet(input: NextSetInput): NextSetDecision {
  const { plan, loggedByExercise, skippedAfterPerforming } = input
  let endedPrevious: string | null = null

  for (const slot of plan.slots) {
    const sets = loggedByExercise.get(slot.exerciseId) ?? []
    const done = decideMovementDone({
      sets,
      prescribedSets: slot.targetSets,
      repRangeLow: slot.repRangeLow,
      skippedAfterPerforming: skippedAfterPerforming.has(slot.exerciseId),
    })
    if (done.done) {
      endedPrevious =
        done.reason === "sets-complete"
          ? null
          : `${done.why} — ${slot.exerciseName} is done for today`
      continue
    }
    const lead = endedPrevious === null ? "" : `${endedPrevious} · `
    return {
      kind: "set",
      slot,
      setNumber: sets.length + 1,
      why: `${lead}${slot.role} ${slot.movementPattern} — ${slot.progression.rationale}`,
    }
  }

  return {
    kind: "done",
    why: `every planned slot for this ${plan.focus} session is complete — nothing further to prescribe`,
  }
}
