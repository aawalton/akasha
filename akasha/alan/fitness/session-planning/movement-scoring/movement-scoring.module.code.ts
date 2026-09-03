import type { GoalWeights } from "@akasha/exercise-access/selection-policy"
import type { Exercise } from "../../exercises/exercise.page-type.ts"
import type { MovementPattern } from "../../exercises/properties/movement-pattern.select-property.ts"
import type { PrimaryMuscles } from "../../exercises/properties/primary-muscles.select-property.ts"
import { CORE_ANTI_PATTERN_SET } from "../pattern-groups/pattern-groups.module.code.ts"

export type MovementFeatures = Pick<
  Exercise,
  | "exerciseCategory"
  | "gripDemand"
  | "isBallistic"
  | "laterality"
  | "mechanic"
  | "movementPattern"
  | "primaryMuscles"
  | "secondaryMuscles"
  | "secondaryPattern"
  | "sfrScore"
  | "skillCost"
  | "trainsLengthenedRange"
>

export type GoalScores = GoalWeights & { readonly blend: number }

const LARGE_MASS: ReadonlySet<PrimaryMuscles> = new Set([
  "glutes",
  "quadriceps",
  "hamstrings",
  "lats",
  "chest",
  "lower-back",
  "middle-back",
])

const UPPER_VISIBLE: ReadonlySet<PrimaryMuscles> = new Set([
  "chest",
  "shoulders",
  "biceps",
  "triceps",
  "lats",
  "middle-back",
  "traps",
])

const VISIBLE_GAP: ReadonlySet<PrimaryMuscles> = new Set([
  "shoulders",
  "biceps",
  "triceps",
  "calves",
])

const UPPER_BODY: ReadonlySet<PrimaryMuscles> = new Set([
  "chest",
  "shoulders",
  "biceps",
  "triceps",
  "lats",
  "middle-back",
  "traps",
  "forearms",
  "neck",
])

const LOWER_BODY: ReadonlySet<PrimaryMuscles> = new Set([
  "glutes",
  "quadriceps",
  "hamstrings",
  "calves",
  "lower-back",
  "abductors",
  "adductors",
])

const FUNCTIONAL_STRENGTH_PATTERNS: ReadonlySet<MovementPattern> = new Set([
  "carry",
  "lunge",
  "hinge",
  "gait",
])

const SFR_CEILING = 5

function clampToUnit(n: number): number {
  return n < 0 ? 0 : n > 1 ? 1 : n
}

function hitsAny(muscles: readonly PrimaryMuscles[], wanted: ReadonlySet<PrimaryMuscles>): boolean {
  return muscles.some((muscle) => wanted.has(muscle))
}

function musclesWorked(features: MovementFeatures): readonly PrimaryMuscles[] {
  return [...features.primaryMuscles, ...(features.secondaryMuscles ?? [])]
}

function isFullBody(features: MovementFeatures): boolean {
  const worked = musclesWorked(features)
  return hitsAny(worked, UPPER_BODY) && hitsAny(worked, LOWER_BODY)
}

export function longevityScore(features: MovementFeatures): number {
  let score = 0
  if (features.mechanic === "compound") score += 0.3
  if (features.isBallistic) score += 0.25
  if (hitsAny(features.primaryMuscles, LARGE_MASS)) score += 0.2
  if (features.movementPattern === "carry" || features.gripDemand === "high") score += 0.15
  score += 0.1 * (features.sfrScore / SFR_CEILING)
  return clampToUnit(score)
}

export function energyScore(features: MovementFeatures): number {
  let score = 0
  if (features.exerciseCategory === "cardio") score += 0.45
  if (features.isBallistic || features.movementPattern === "gait") score += 0.25
  if (features.mechanic === "compound" && isFullBody(features)) score += 0.15
  return clampToUnit(score)
}

export function functionalityScore(features: MovementFeatures): number {
  let strength = 0
  if (features.mechanic === "compound") strength += 0.3
  if (features.laterality === "unilateral" || features.laterality === "alternating") {
    strength += 0.25
  }
  if (FUNCTIONAL_STRENGTH_PATTERNS.has(features.movementPattern)) strength += 0.2
  if (CORE_ANTI_PATTERN_SET.has(features.movementPattern)) strength += 0.15
  if (features.skillCost === "moderate") strength += 0.1
  const mobility = features.trainsLengthenedRange ? 0.5 : 0
  return clampToUnit(0.6 * clampToUnit(strength) + 0.4 * clampToUnit(mobility))
}

export function aestheticsScore(features: MovementFeatures): number {
  let score = 0
  if (hitsAny(features.primaryMuscles, UPPER_VISIBLE)) score += 0.5
  if (!features.isBallistic) score += 0.3
  if (features.mechanic === "isolation" && hitsAny(features.primaryMuscles, VISIBLE_GAP)) {
    score += 0.2
  }
  return clampToUnit(score)
}

function weightTotal(weights: GoalWeights): number {
  const total = weights.longevity + weights.energy + weights.functionality + weights.aesthetics
  return total > 0 ? total : 1
}

export function scoreMovement(features: MovementFeatures, weights: GoalWeights): GoalScores {
  const longevity = longevityScore(features)
  const energy = energyScore(features)
  const functionality = functionalityScore(features)
  const aesthetics = aestheticsScore(features)
  const blend =
    (weights.longevity * longevity +
      weights.energy * energy +
      weights.functionality * functionality +
      weights.aesthetics * aesthetics) /
    weightTotal(weights)
  return { longevity, energy, functionality, aesthetics, blend }
}
