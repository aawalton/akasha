import type { Title } from "../../../../pages/pages/properties/title.text-property.ts"
import type { Equipment } from "../../exercises/properties/equipment.select-property.ts"
import type { IsBallistic } from "../../exercises/properties/is-ballistic.boolean-property.ts"
import type { Laterality } from "../../exercises/properties/laterality.select-property.ts"
import type { MovementPattern } from "../../exercises/properties/movement-pattern.select-property.ts"
import type { MuscleFocus } from "../../exercises/properties/muscle-focus.select-property.ts"
import type { SecondaryPattern } from "../../exercises/properties/secondary-pattern.select-property.ts"
import type { SkillCost } from "../../exercises/properties/skill-cost.select-property.ts"
import type { ExerciseSlug } from "../../set-logs/properties/exercise-slug.relation-property.ts"
import type { GoalScores } from "../movement-scoring/movement-scoring.module.code.ts"
import type { PerformedSet } from "../performed-set/performed-set.module.code.ts"

export type ScoredCandidate = {
  readonly exerciseSlug: ExerciseSlug
  readonly title: Title
  readonly movementPattern: MovementPattern
  readonly secondaryPattern: SecondaryPattern | null
  readonly muscleFocus: MuscleFocus
  readonly laterality: Laterality
  readonly skillCost: SkillCost
  readonly isBallistic: IsBallistic
  readonly equipment: Equipment | null
  readonly scores: GoalScores
  readonly loadsLadder: readonly number[]
  readonly lastSessionSets: readonly PerformedSet[]
  readonly logged: boolean
  readonly sessionsLogged: number
  readonly lastDayStr: string | null
  readonly priorDayStr: string | null
  readonly improvingRecently: boolean
}

export type AnchorState = "held" | "novel" | "stalled-held" | "none"

export type AnchorPick = {
  readonly candidate: ScoredCandidate | null
  readonly state: AnchorState
  readonly rationale: string
}

function topByBlend(candidates: readonly ScoredCandidate[]): ScoredCandidate {
  return candidates.reduce((held, next) => (next.scores.blend > held.scores.blend ? next : held))
}

function mostLogged(candidates: readonly ScoredCandidate[]): ScoredCandidate {
  return candidates.reduce((held, next) => {
    if (next.sessionsLogged !== held.sessionsLogged) {
      return next.sessionsLogged > held.sessionsLogged ? next : held
    }
    const heldDay = held.lastDayStr ?? ""
    const nextDay = next.lastDayStr ?? ""
    if (nextDay !== heldDay) return nextDay > heldDay ? next : held
    return next.scores.blend > held.scores.blend ? next : held
  })
}

export function deriveAnchor(candidates: readonly ScoredCandidate[]): AnchorPick {
  if (candidates.length === 0) {
    return { candidate: null, state: "none", rationale: "no in-kit candidate for this pattern" }
  }
  const withHistory = candidates.filter((candidate) => candidate.sessionsLogged > 0)
  if (withHistory.length === 0) {
    const top = topByBlend(candidates)
    return {
      candidate: top,
      state: "novel",
      rationale: `no logged anchor for this pattern — introduce top-ranked ${top.title}`,
    }
  }
  const held = mostLogged(withHistory)
  if (held.improvingRecently) {
    return {
      candidate: held,
      state: "held",
      rationale: `holding progressing anchor ${held.title} (${held.sessionsLogged} logged sessions)`,
    }
  }
  return {
    candidate: held,
    state: "stalled-held",
    rationale: `anchor ${held.title} looks stalled (${held.sessionsLogged} sessions, no recent best) — holding and flagging; consider a deload or a coach-chosen swap`,
  }
}

export const ROTATION_WINDOW = 5

export function rankCandidates(
  candidates: readonly ScoredCandidate[],
  daySeed: number,
  slotIndex: number,
  scoreOf: (candidate: ScoredCandidate) => number
): readonly ScoredCandidate[] {
  const byScore = (a: ScoredCandidate, b: ScoredCandidate): number => scoreOf(b) - scoreOf(a)
  const sorted = [...candidates].sort(byScore)
  if (sorted.length <= 1) return sorted
  const window = Math.min(ROTATION_WINDOW, sorted.length)
  const offset = (((daySeed + slotIndex) % window) + window) % window
  const head = sorted.slice(0, window)
  const rotated = [...head.slice(offset), ...head.slice(0, offset), ...sorted.slice(window)]
  return rotated.sort(byScore)
}
