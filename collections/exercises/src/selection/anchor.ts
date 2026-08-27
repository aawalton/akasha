import type { GoalScores } from "./scorer"
import type { SetLine } from "../tracking/history-core"

export interface ScoredCandidate {
  readonly id: string
  readonly name: string
  readonly movementPattern: string
  readonly secondaryPattern: string | null
  readonly muscleFocus: string
  readonly laterality: string
  readonly skillCost: string
  readonly isBallistic: boolean
  readonly equipment: string | null
  readonly scores: GoalScores
  readonly loadsLadder: readonly number[]
  readonly lastSessionSets: readonly SetLine[]
  readonly logged: boolean
  readonly sessionsLogged: number
  readonly lastDayStr: string | null
  readonly priorDayStr: string | null
  readonly improvingRecently: boolean
}

export type AnchorState = "held" | "novel" | "stalled-held" | "none"

export interface AnchorPick {
  readonly candidate: ScoredCandidate | null
  readonly state: AnchorState
  readonly rationale: string
}

function topByBlend(candidates: readonly ScoredCandidate[]): ScoredCandidate {
  return candidates.reduce((a, b) => (b.scores.blend > a.scores.blend ? b : a))
}

function mostLogged(candidates: readonly ScoredCandidate[]): ScoredCandidate {
  return candidates.reduce((a, b) => {
    if (b.sessionsLogged !== a.sessionsLogged) return b.sessionsLogged > a.sessionsLogged ? b : a
    const aDay = a.lastDayStr ?? ""
    const bDay = b.lastDayStr ?? ""
    if (bDay !== aDay) return bDay > aDay ? b : a
    return b.scores.blend > a.scores.blend ? b : a
  })
}

export function deriveAnchor(candidates: readonly ScoredCandidate[]): AnchorPick {
  if (candidates.length === 0) {
    return { candidate: null, state: "none", rationale: "no in-kit candidate for this pattern" }
  }
  const withHistory = candidates.filter((c) => c.sessionsLogged > 0)
  if (withHistory.length === 0) {
    const top = topByBlend(candidates)
    return {
      candidate: top,
      state: "novel",
      rationale: `no logged anchor for this pattern — introduce top-ranked ${top.name}`,
    }
  }
  const held = mostLogged(withHistory)
  if (held.improvingRecently) {
    return {
      candidate: held,
      state: "held",
      rationale: `holding progressing anchor ${held.name} (${held.sessionsLogged} logged sessions)`,
    }
  }
  return {
    candidate: held,
    state: "stalled-held",
    rationale: `anchor ${held.name} looks stalled (${held.sessionsLogged} sessions, no recent best) — holding and flagging; consider a deload or a coach-chosen swap`,
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
