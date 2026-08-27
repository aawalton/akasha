import type { ScoredCandidate } from "./anchor"
import { type CoverageState, computeCoverage } from "./coverage"
import type { SelectionPolicy } from "./policy"
import type { SelectorInputs } from "./selector"
import type { SetLine } from "../tracking/history-core"

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

export const DB_LADDER = [3, 5, 8, 10, 15, 20, 25, 30]

export function set(weight: number | null, reps: number): SetLine {
  return { date: "2026-07-20", setNumber: null, reps, weight, rpe: null, isWarmup: false }
}

export function cand(
  id: string,
  movementPattern: string,
  blend: number,
  over: Partial<ScoredCandidate> = {}
): ScoredCandidate {
  return {
    id,
    name: id,
    movementPattern,
    secondaryPattern: null,
    laterality: "bilateral",
    skillCost: "moderate",
    muscleFocus: "push",
    isBallistic: false,
    equipment: "dumbbell",
    scores: { longevity: 0, energy: 0, functionality: 0, aesthetics: 0, blend },
    loadsLadder: DB_LADDER,
    lastSessionSets: [],
    logged: true,
    sessionsLogged: 3,
    lastDayStr: "2026-07-20",
    priorDayStr: "2026-07-20",
    improvingRecently: true,
    ...over,
  }
}

export function unfilled(envelope: {
  unfilledSlots: readonly { slot: string }[]
}): readonly string[] {
  return envelope.unfilledSlots.map((u) => u.slot)
}

export function novel(
  id: string,
  pattern: string,
  blend: number,
  over: Partial<ScoredCandidate> = {}
): ScoredCandidate {
  return cand(id, pattern, blend, {
    logged: false,
    sessionsLogged: 0,
    lastDayStr: null,
    priorDayStr: null,
    ...over,
  })
}

export function inputs(
  candidates: readonly ScoredCandidate[],
  over: {
    focus?: string
    dayStr?: string
    daySeed?: number
    policy?: SelectionPolicy
    coverage?: CoverageState
    loggedPatterns?: ReadonlySet<string>
    sessionPerformed?: ReadonlySet<string>
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
      new Set(candidates.filter((c) => c.logged).map((c) => c.movementPattern)),
    sessionPerformed: over.sessionPerformed ?? new Set(),
  }
}
