import type { ExerciseSlug } from "../../set-logs/properties/exercise-slug.relation-property.ts"
import type { Reps } from "../../set-logs/properties/reps.number-property.ts"
import type { Rpe } from "../../set-logs/properties/rpe.number-property.ts"
import type { SetNumber } from "../../set-logs/properties/set-number.number-property.ts"
import type {
  PlannedSlot,
  SessionPlan,
} from "../session-selection/session-selection.module.code.ts"

export type SessionSet = {
  readonly setNumber: SetNumber
  readonly reps: Reps | null
  readonly rpe: Rpe | null
}

export const HIGH_RPE_THRESHOLD = 9

export type MovementEndReason =
  | "sets-complete"
  | "high-rpe"
  | "reps-below-range"
  | "skipped-after-performing"

export type MovementDoneInput = {
  readonly sets: readonly SessionSet[]
  readonly prescribedSets: number
  readonly repRangeLow: number
  readonly skippedAfterPerforming: boolean
}

export type MovementDoneDecision = {
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

export type SkipPartition = {
  readonly toExclude: ReadonlySet<ExerciseSlug>
  readonly afterPerforming: ReadonlySet<ExerciseSlug>
}

export function partitionSkips(
  skipped: ReadonlySet<ExerciseSlug>,
  sessionPerformed: ReadonlySet<ExerciseSlug>
): SkipPartition {
  const toExclude = new Set<ExerciseSlug>()
  const afterPerforming = new Set<ExerciseSlug>()
  for (const slug of skipped) {
    if (sessionPerformed.has(slug)) afterPerforming.add(slug)
    else toExclude.add(slug)
  }
  return { toExclude, afterPerforming }
}

export type NextSetInput = {
  readonly plan: SessionPlan
  readonly loggedByExercise: ReadonlyMap<ExerciseSlug, readonly SessionSet[]>
  readonly skippedAfterPerforming: ReadonlySet<ExerciseSlug>
}

export type NextSet = {
  readonly kind: "set"
  readonly slot: PlannedSlot
  readonly setNumber: SetNumber
  readonly why: string
}

export type SessionComplete = {
  readonly kind: "done"
  readonly why: string
}

export type NextSetDecision = NextSet | SessionComplete

export function decideNextSet(input: NextSetInput): NextSetDecision {
  const { plan, loggedByExercise, skippedAfterPerforming } = input
  let endedPrevious: string | null = null

  for (const slot of plan.slots) {
    const sets = loggedByExercise.get(slot.exerciseSlug) ?? []
    const done = decideMovementDone({
      sets,
      prescribedSets: slot.targetSets,
      repRangeLow: slot.repRangeLow,
      skippedAfterPerforming: skippedAfterPerforming.has(slot.exerciseSlug),
    })
    if (done.done) {
      endedPrevious =
        done.reason === "sets-complete" ? null : `${done.why} — ${slot.title} is done for today`
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
