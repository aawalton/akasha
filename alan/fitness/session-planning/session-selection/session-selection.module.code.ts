import type { GoalWeights, SelectionPolicy } from "@akasha/exercise-access/selection-policy"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { IsBallistic } from "../../exercises/properties/is-ballistic.boolean-property.ts"
import type { Laterality } from "../../exercises/properties/laterality.select-property.ts"
import type { MovementPattern } from "../../exercises/properties/movement-pattern.select-property.ts"
import type { MuscleFocus } from "../../exercises/properties/muscle-focus.select-property.ts"
import type { SkillCost } from "../../exercises/properties/skill-cost.select-property.ts"
import type { ExerciseSlug } from "../../set-logs/properties/exercise-slug.relation-property.ts"
import {
  decideProgression,
  type ProgressionDecision,
} from "../load-progression/load-progression.module.code.ts"
import { effectiveScore, recencyBonus } from "../movement-recency/movement-recency.module.code.ts"
import type { GoalScores } from "../movement-scoring/movement-scoring.module.code.ts"
import {
  reserveNoveltySlot,
  type StarvedSlot,
} from "../novelty-budget/novelty-budget.module.code.ts"
import {
  type AnchorState,
  deriveAnchor,
  rankCandidates,
  type ScoredCandidate,
} from "../session-anchor/session-anchor.module.code.ts"
import {
  NATIVE_PATTERN_BY_ROLE,
  NATIVE_PATTERNS,
  ROLE_DEFAULTS,
  type Role,
  type SlotSpec,
  slotsForFocus,
} from "../slot-templates/slot-templates.module.code.ts"
import {
  type CoverageState,
  isGapPattern,
  patternLateralityKey,
} from "../weekly-coverage/weekly-coverage.module.code.ts"

export type SelectorInputs = {
  readonly focus: string
  readonly dayStr: string
  readonly daySeed: number
  readonly policy: SelectionPolicy
  readonly candidates: readonly ScoredCandidate[]
  readonly coverage: CoverageState
  readonly loggedPatterns: ReadonlySet<MovementPattern>
  readonly sessionPerformed: ReadonlySet<ExerciseSlug>
}

export type PlannedSlot = {
  readonly sortOrder: number
  readonly role: Role
  readonly exerciseSlug: ExerciseSlug
  readonly title: Title
  readonly movementPattern: MovementPattern
  readonly repRangeLow: number
  readonly repRangeHigh: number
  readonly targetRir: number
  readonly targetSets: number
  readonly progression: ProgressionDecision
}

export type SessionPlan = {
  readonly focus: string
  readonly slots: readonly PlannedSlot[]
}

export type RejectedCandidate = {
  readonly exerciseSlug: ExerciseSlug
  readonly title: Title
  readonly blend: number
  readonly reason: string
}

export type FeaturesUsed = {
  readonly movementPattern: MovementPattern
  readonly muscleFocus: MuscleFocus
  readonly laterality: Laterality
  readonly skillCost: SkillCost
  readonly isBallistic: IsBallistic
}

export type SelectionDecision = {
  readonly sortOrder: number
  readonly role: Role
  readonly slotPatterns: readonly MovementPattern[]
  readonly exerciseSlug: ExerciseSlug
  readonly title: Title
  readonly scores: GoalScores
  readonly featuresUsed: FeaturesUsed
  readonly rulesFired: readonly string[]
  readonly anchorState: AnchorState | null
  readonly progression: ProgressionDecision
  readonly rationale: string
  readonly rejected: readonly RejectedCandidate[]
}

export type UnfilledReason = "no-in-kit-candidate" | "novelty-capped"

export type UnfilledSlot = {
  readonly slot: string
  readonly reason: UnfilledReason
}

export type SelectionEnvelope = {
  readonly focus: string
  readonly daySeed: number
  readonly weights: GoalWeights
  readonly coverage: CoverageState
  readonly decisions: readonly SelectionDecision[]
  readonly unfilledSlots: readonly UnfilledSlot[]
}

export type SelectionResult = {
  readonly plan: SessionPlan
  readonly envelope: SelectionEnvelope
}

const REJECTED_LIMIT = 4

const PROGRESSING_ROLES: ReadonlySet<Role> = new Set(["anchor", "accessory", "power"])

const NOVELTY_EXEMPT_ROLES: ReadonlySet<Role> = new Set(["anchor", "conditioning"])

const NOTHING_CHOSEN: ReadonlySet<ExerciseSlug> = new Set()

function slotAdmits(slot: SlotSpec, pattern: MovementPattern): boolean {
  if (!NATIVE_PATTERNS.has(pattern)) return true
  return NATIVE_PATTERN_BY_ROLE[slot.role] === pattern
}

function candidatesForSlot(
  candidates: readonly ScoredCandidate[],
  slot: SlotSpec,
  chosen: ReadonlySet<ExerciseSlug>
): readonly ScoredCandidate[] {
  const allowed = new Set<MovementPattern>(slot.patterns)
  const pool = candidates.filter(
    (candidate) =>
      !chosen.has(candidate.exerciseSlug) &&
      slotAdmits(slot, candidate.movementPattern) &&
      (slot.muscleFocus === undefined || candidate.muscleFocus === slot.muscleFocus) &&
      (allowed.has(candidate.movementPattern) ||
        (candidate.secondaryPattern !== null && allowed.has(candidate.secondaryPattern)))
  )
  if (slot.ballisticPreference === undefined) return pool
  const wanted = slot.ballisticPreference === "prefer"
  const preferred = pool.filter((candidate) => candidate.isBallistic === wanted)
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
  return [
    ...rank(pool.filter((candidate) => isGap(candidate))),
    ...rank(pool.filter((candidate) => !isGap(candidate))),
  ]
}

function starvedSlots(
  slots: readonly SlotSpec[],
  candidates: readonly ScoredCandidate[],
  loggedPatterns: ReadonlySet<MovementPattern>
): readonly StarvedSlot[] {
  const starved: StarvedSlot[] = []
  slots.forEach((slot, slotIndex) => {
    if (NOVELTY_EXEMPT_ROLES.has(slot.role)) return
    const pool = candidatesForSlot(candidates, slot, NOTHING_CHOSEN)
    if (pool.length === 0 || pool.some((candidate) => candidate.logged)) return
    starved.push({
      slotIndex,
      patternUntrained: !pool.some((candidate) => loggedPatterns.has(candidate.movementPattern)),
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

function recencyRule(pick: ScoredCandidate, bonus: number): string {
  if (pick.priorDayStr === null) return "recency:none(never-performed)"
  if (bonus <= 0) return "recency:none(performed-today)"
  return `recency:+${bonus.toFixed(3)}(last ${pick.priorDayStr})`
}

function rejectedFrom(
  pool: readonly ScoredCandidate[],
  pickedSlug: ExerciseSlug,
  novelAllowed: boolean,
  scoreOf: (candidate: ScoredCandidate) => number
): readonly RejectedCandidate[] {
  return [...pool]
    .filter((candidate) => candidate.exerciseSlug !== pickedSlug)
    .sort((a, b) => scoreOf(b) - scoreOf(a))
    .slice(0, REJECTED_LIMIT)
    .map((candidate) => ({
      exerciseSlug: candidate.exerciseSlug,
      title: candidate.title,
      blend: Number(candidate.scores.blend.toFixed(3)),
      reason: candidate.logged
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

  const bonusOf = (candidate: ScoredCandidate): number =>
    recencyBonus(candidate.priorDayStr, dayStr, policy)
  const scoreOf = (candidate: ScoredCandidate): number =>
    effectiveScore(candidate.scores.blend, bonusOf(candidate))

  const chosen = new Set<ExerciseSlug>()
  const sessionKeys = new Set<string>()
  const isGap = (candidate: ScoredCandidate): boolean =>
    isGapPattern(coverage, candidate.movementPattern) &&
    !sessionKeys.has(patternLateralityKey(candidate.movementPattern, candidate.laterality))
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

    const performed = pool.filter((candidate) => sessionPerformed.has(candidate.exerciseSlug))
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
      const eligible = ordered.find((candidate) => candidate.logged || novelAllowed)
      if (eligible === undefined) {
        gap("novelty-capped")
        return
      }
      pick = eligible
      rulesFired.push(recencyRule(pick, bonusOf(pick)))
      baseRationale = `${slot.role} ${pick.movementPattern}: ${pick.title} (blend ${pick.scores.blend.toFixed(3)})`
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

    chosen.add(pick.exerciseSlug)
    sessionKeys.add(patternLateralityKey(pick.movementPattern, pick.laterality))
    plannedSlots.push({
      sortOrder,
      role: slot.role,
      exerciseSlug: pick.exerciseSlug,
      title: pick.title,
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
      exerciseSlug: pick.exerciseSlug,
      title: pick.title,
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
      rejected: rejectedFrom(pool, pick.exerciseSlug, novelAllowed, scoreOf),
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
