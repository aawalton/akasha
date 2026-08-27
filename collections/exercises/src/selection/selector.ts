import {
  type AnchorState,
  deriveAnchor,
  rankCandidates,
  type ScoredCandidate,
} from "./anchor"
import { type CoverageState, isGapPattern, patternLateralityKey } from "./coverage"
import { reserveNoveltySlot, type StarvedSlot } from "./novelty-budget"
import type { SelectionPolicy } from "./policy"
import { decideProgression, type ProgressionDecision } from "./progression"
import { effectiveScore, recencyBonus } from "./recency"
import type { GoalScores, GoalWeights } from "./scorer"
import {
  NATIVE_PATTERN_BY_ROLE,
  NATIVE_PATTERNS,
  ROLE_DEFAULTS,
  type Role,
  type SlotSpec,
  slotsForFocus,
} from "./slot-templates"


export interface SelectorInputs {
  readonly focus: string
  readonly dayStr: string
  readonly daySeed: number
  readonly policy: SelectionPolicy
  readonly candidates: readonly ScoredCandidate[]
  readonly coverage: CoverageState
  readonly loggedPatterns: ReadonlySet<string>
  readonly sessionPerformed: ReadonlySet<string>
}

export interface PlannedSlot {
  readonly sortOrder: number
  readonly role: Role
  readonly exerciseId: string
  readonly exerciseName: string
  readonly movementPattern: string
  readonly repRangeLow: number
  readonly repRangeHigh: number
  readonly targetRir: number
  readonly targetSets: number
  readonly progression: ProgressionDecision
}

export interface SessionPlan {
  readonly focus: string
  readonly slots: readonly PlannedSlot[]
}

export interface RejectedCandidate {
  readonly id: string
  readonly name: string
  readonly blend: number
  readonly reason: string
}

export interface FeaturesUsed {
  readonly movementPattern: string
  readonly muscleFocus: string
  readonly laterality: string
  readonly skillCost: string
  readonly isBallistic: boolean
}

export interface SelectionDecision {
  readonly sortOrder: number
  readonly role: Role
  readonly slotPatterns: readonly string[]
  readonly exerciseId: string
  readonly exerciseName: string
  readonly scores: GoalScores
  readonly featuresUsed: FeaturesUsed
  readonly rulesFired: readonly string[]
  readonly anchorState: AnchorState | null
  readonly progression: ProgressionDecision
  readonly rationale: string
  readonly rejected: readonly RejectedCandidate[]
}

export type UnfilledReason = "no-in-kit-candidate" | "novelty-capped"

export interface UnfilledSlot {
  readonly slot: string
  readonly reason: UnfilledReason
}

export interface SelectionEnvelope {
  readonly focus: string
  readonly daySeed: number
  readonly weights: GoalWeights
  readonly coverage: CoverageState
  readonly decisions: readonly SelectionDecision[]
  readonly unfilledSlots: readonly UnfilledSlot[]
}

export interface SelectionResult {
  readonly plan: SessionPlan
  readonly envelope: SelectionEnvelope
}

const REJECTED_LIMIT = 4

function slotAdmits(slot: SlotSpec, pattern: string): boolean {
  if (!NATIVE_PATTERNS.has(pattern)) return true
  return NATIVE_PATTERN_BY_ROLE[slot.role] === pattern
}

function candidatesForSlot(
  candidates: readonly ScoredCandidate[],
  slot: SlotSpec,
  chosen: ReadonlySet<string>
): readonly ScoredCandidate[] {
  const allowed = new Set(slot.patterns)
  const pool = candidates.filter(
    (c) =>
      !chosen.has(c.id) &&
      slotAdmits(slot, c.movementPattern) &&
      (slot.muscleFocus === undefined || c.muscleFocus === slot.muscleFocus) &&
      (allowed.has(c.movementPattern) ||
        (c.secondaryPattern !== null && allowed.has(c.secondaryPattern)))
  )
  if (slot.ballisticPreference === undefined) return pool
  const wanted = slot.ballisticPreference === "prefer"
  const preferred = pool.filter((c) => c.isBallistic === wanted)
  return preferred.length > 0 ? preferred : pool
}

function accessoryOrder(
  pool: readonly ScoredCandidate[],
  slot: SlotSpec,
  isGap: (candidate: ScoredCandidate) => boolean,
  daySeed: number,
  slotIndex: number,
  scoreOf: (candidate: ScoredCandidate) => number
): readonly ScoredCandidate[] {
  const rank = (list: readonly ScoredCandidate[]): readonly ScoredCandidate[] =>
    rankCandidates(list, daySeed, slotIndex, scoreOf)
  if (slot.coverageFlex !== true) return rank(pool)
  return [...rank(pool.filter((c) => isGap(c))), ...rank(pool.filter((c) => !isGap(c)))]
}

function starvedSlots(
  slots: readonly SlotSpec[],
  candidates: readonly ScoredCandidate[],
  loggedPatterns: ReadonlySet<string>
): readonly StarvedSlot[] {
  const starved: StarvedSlot[] = []
  slots.forEach((slot, slotIndex) => {
    if (NOVELTY_EXEMPT_ROLES.has(slot.role)) return
    const pool = candidatesForSlot(candidates, slot, NOTHING_CHOSEN)
    if (pool.length === 0 || pool.some((c) => c.logged)) return
    starved.push({
      slotIndex,
      patternUntrained: !pool.some((c) => loggedPatterns.has(c.movementPattern)),
    })
  })
  return starved
}

function staticPrescription(
  role: Role,
  repRangeLow: number,
  repRangeHigh: number,
  targetSets: number
): ProgressionDecision {
  return {
    action: "introduce",
    prescribedLoad: null,
    prescribedRepLow: repRangeLow,
    prescribedRepHigh: repRangeHigh,
    prescribedSets: targetSets,
    coarseJumpGuardFired: false,
    rationale:
      role === "conditioning"
        ? "time-based Zone-2 finisher — no load progression"
        : "light preparatory / mobility work — no load progression",
  }
}

const PROGRESSING_ROLES: ReadonlySet<Role> = new Set(["anchor", "accessory", "power"])

const NOVELTY_EXEMPT_ROLES: ReadonlySet<Role> = new Set(["anchor", "conditioning"])

const NOTHING_CHOSEN: ReadonlySet<string> = new Set()

function recencyRule(pick: ScoredCandidate, bonus: number): string {
  if (pick.priorDayStr === null) return "recency:none(never-performed)"
  if (bonus <= 0) return "recency:none(performed-today)"
  return `recency:+${bonus.toFixed(3)}(last ${pick.priorDayStr})`
}

function rejectedFrom(
  pool: readonly ScoredCandidate[],
  pickId: string,
  novelAllowed: boolean,
  scoreOf: (candidate: ScoredCandidate) => number
): readonly RejectedCandidate[] {
  return [...pool]
    .filter((c) => c.id !== pickId)
    .sort((a, b) => scoreOf(b) - scoreOf(a))
    .slice(0, REJECTED_LIMIT)
    .map((c) => ({
      id: c.id,
      name: c.name,
      blend: Number(c.scores.blend.toFixed(3)),
      reason: c.logged
        ? "lower blend"
        : novelAllowed
          ? "lower blend (novel)"
          : "novel — outside the session novelty budget",
    }))
}

export function selectSession(inputs: SelectorInputs): SelectionResult {
  const { focus, dayStr, daySeed, policy, candidates, coverage, loggedPatterns } = inputs
  const sessionPerformed = inputs.sessionPerformed
  const slots = slotsForFocus(focus)

  const bonusOf = (c: ScoredCandidate): number => recencyBonus(c.priorDayStr, dayStr, policy)
  const scoreOf = (c: ScoredCandidate): number => effectiveScore(c.scores.blend, bonusOf(c))

  const chosen = new Set<string>()
  const sessionKeys = new Set<string>()
  const isGap = (c: ScoredCandidate): boolean =>
    isGapPattern(coverage, c.movementPattern) &&
    !sessionKeys.has(patternLateralityKey(c.movementPattern, c.laterality))
  const noveltyCap = policy.noveltyCapPerSession
  const reservedForSlot = reserveNoveltySlot(starvedSlots(slots, candidates, loggedPatterns))
  let novelUsed = 0

  const plannedSlots: PlannedSlot[] = []
  const decisions: SelectionDecision[] = []
  const unfilledSlots: UnfilledSlot[] = []
  let sortOrder = 0

  slots.forEach((slot, slotIndex) => {
    const gap = (reason: UnfilledReason): undefined => {
      if (slot.optional !== true) {
        unfilledSlots.push({ slot: `${slot.role}:${slot.patterns.join("|")}`, reason })
      }
    }
    const pool = candidatesForSlot(candidates, slot, chosen)
    if (pool.length === 0) {
      gap("no-in-kit-candidate")
      return
    }
    const rulesFired: string[] = ["in-kit"]

    const performed = pool.filter((c) => sessionPerformed.has(c.id))
    const pinned = performed.length > 0
    const effectivePool = pinned ? performed : pool
    if (pinned) rulesFired.push("session:already-performed")

    const exempt = NOVELTY_EXEMPT_ROLES.has(slot.role)
    const novelAllowed =
      exempt ||
      (novelUsed < noveltyCap && (reservedForSlot === null || reservedForSlot <= slotIndex))
    const defaults = ROLE_DEFAULTS[slot.role]
    let pick: ScoredCandidate
    let anchorState: AnchorState | null = null
    let baseRationale: string

    if (slot.role === "anchor") {
      const anchorPick = deriveAnchor(effectivePool)
      if (anchorPick.candidate === null) {
        gap("no-in-kit-candidate")
        return
      }
      pick = anchorPick.candidate
      anchorState = anchorPick.state
      baseRationale = anchorPick.rationale
      rulesFired.push(`anchor:${anchorPick.state}`)
      rulesFired.push("recency:not-applied(anchor)")
    } else {
      const ordered = accessoryOrder(effectivePool, slot, isGap, daySeed, slotIndex, scoreOf)
      const eligible = ordered.find((c) => c.logged || novelAllowed)
      if (eligible === undefined) {
        gap("novelty-capped")
        return
      }
      pick = eligible
      rulesFired.push(recencyRule(pick, bonusOf(pick)))
      baseRationale = `${slot.role} ${pick.movementPattern}: ${pick.name} (blend ${pick.scores.blend.toFixed(3)})`
    }

    if (!pick.logged) {
      if (exempt) {
        rulesFired.push(`novelty:exempt(${slot.role})`)
      } else {
        novelUsed += 1
        rulesFired.push(`novelty:novel(${novelUsed}/${noveltyCap})`)
      }
    }
    if (slot.coverageFlex === true && isGap(pick)) {
      rulesFired.push(`coverage-repair:${pick.movementPattern}`)
    }
    if (slot.muscleFocus !== undefined) rulesFired.push(`focus-muscle:${slot.muscleFocus}`)

    const progression = PROGRESSING_ROLES.has(slot.role)
      ? decideProgression({
          lastSessionSets: pick.lastSessionSets,
          repRangeLow: defaults.repRangeLow,
          repRangeHigh: defaults.repRangeHigh,
          targetSets: defaults.targetSets,
          loadsLadder: pick.loadsLadder,
        })
      : staticPrescription(
          slot.role,
          defaults.repRangeLow,
          defaults.repRangeHigh,
          defaults.targetSets
        )
    if (progression.coarseJumpGuardFired) rulesFired.push("coarse-jump-guard")

    chosen.add(pick.id)
    sessionKeys.add(patternLateralityKey(pick.movementPattern, pick.laterality))
    plannedSlots.push({
      sortOrder,
      role: slot.role,
      exerciseId: pick.id,
      exerciseName: pick.name,
      movementPattern: pick.movementPattern,
      repRangeLow: progression.prescribedRepLow,
      repRangeHigh: progression.prescribedRepHigh,
      targetRir: defaults.targetRir,
      targetSets: progression.prescribedSets,
      progression,
    })
    decisions.push({
      sortOrder,
      role: slot.role,
      slotPatterns: slot.patterns,
      exerciseId: pick.id,
      exerciseName: pick.name,
      scores: pick.scores,
      featuresUsed: {
        movementPattern: pick.movementPattern,
        muscleFocus: pick.muscleFocus,
        laterality: pick.laterality,
        skillCost: pick.skillCost,
        isBallistic: pick.isBallistic,
      },
      rulesFired,
      anchorState,
      progression,
      rationale: `${baseRationale} — ${progression.rationale}`,
      rejected: rejectedFrom(pool, pick.id, novelAllowed, scoreOf),
    })
    sortOrder += 1
  })

  return {
    plan: { focus, slots: plannedSlots },
    envelope: {
      focus,
      daySeed,
      weights: policy.weights,
      coverage,
      decisions,
      unfilledSlots,
    },
  }
}
