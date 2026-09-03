import type { SelectionPolicy } from "@akasha/exercise-access/selection-policy"
import type { MovementPattern } from "../../exercises/properties/movement-pattern.select-property.ts"
import type { ExerciseSlug } from "../../set-logs/properties/exercise-slug.relation-property.ts"
import type { PerformedSet } from "../performed-set/performed-set.module.code.ts"
import type { ScoredCandidate } from "../session-anchor/session-anchor.module.code.ts"
import {
  type CoverageState,
  computeCoverage,
} from "../weekly-coverage/weekly-coverage.module.code.ts"
import type { SelectorInputs } from "./session-selection.module.code.ts"

export const FIXTURE_POLICY: SelectionPolicy = {
  weights: { longevity: 40, energy: 30, functionality: 20, aesthetics: 10 },
  noveltyCapPerSession: 1,
  anchorBlockWeeks: 6,
  weeklySetFloor: 6,
  weeklySetCeiling: 12,
  zone2WeeklyFloor: 150,
  recencyWeight: 0.05,
  recencySaturationDays: 21,
}

export const DUMBBELL_LADDER = [3, 5, 8, 10, 15, 20, 25, 30]

export function performed(weight: number | null, reps: number): PerformedSet {
  return { day: "2026-07-20", setNumber: null, reps, weight, rpe: null, isWarmup: false }
}

export function candidate(
  exerciseSlug: string,
  movementPattern: MovementPattern,
  blend: number,
  over: Partial<ScoredCandidate> = {}
): ScoredCandidate {
  return {
    exerciseSlug,
    title: exerciseSlug,
    movementPattern,
    secondaryPattern: null,
    laterality: "bilateral",
    skillCost: "moderate",
    muscleFocus: "push",
    isBallistic: false,
    equipment: "dumbbell",
    scores: { longevity: 0, energy: 0, functionality: 0, aesthetics: 0, blend },
    loadsLadder: DUMBBELL_LADDER,
    lastSessionSets: [],
    logged: true,
    sessionsLogged: 3,
    lastDayStr: "2026-07-20",
    priorDayStr: "2026-07-20",
    improvingRecently: true,
    ...over,
  }
}

export function novelCandidate(
  exerciseSlug: string,
  movementPattern: MovementPattern,
  blend: number,
  over: Partial<ScoredCandidate> = {}
): ScoredCandidate {
  return candidate(exerciseSlug, movementPattern, blend, {
    logged: false,
    sessionsLogged: 0,
    lastDayStr: null,
    priorDayStr: null,
    ...over,
  })
}

export function unfilled(envelope: {
  unfilledSlots: readonly { slot: string }[]
}): readonly string[] {
  return envelope.unfilledSlots.map((one) => one.slot)
}

export function selectorInputs(
  candidates: readonly ScoredCandidate[],
  over: {
    focus?: string
    dayStr?: string
    daySeed?: number
    policy?: SelectionPolicy
    coverage?: CoverageState
    loggedPatterns?: ReadonlySet<MovementPattern>
    sessionPerformed?: ReadonlySet<ExerciseSlug>
  } = {}
): SelectorInputs {
  return {
    focus: over.focus ?? "push",
    dayStr: over.dayStr ?? "2026-07-25",
    daySeed: over.daySeed ?? 0,
    policy: over.policy ?? FIXTURE_POLICY,
    candidates,
    coverage: over.coverage ?? computeCoverage([]),
    loggedPatterns:
      over.loggedPatterns ??
      new Set(candidates.filter((one) => one.logged).map((one) => one.movementPattern)),
    sessionPerformed: over.sessionPerformed ?? new Set(),
  }
}
