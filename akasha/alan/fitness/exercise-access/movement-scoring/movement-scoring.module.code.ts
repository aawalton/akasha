import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"
import {
  boolIn,
  numberIn,
  type Row,
  textIn,
  textsIn,
} from "../exercise-rows/exercise-rows.module.code.ts"
import type { GoalWeights } from "../selection-policy/selection-policy.module.code.ts"

export interface MovementFeatures {
  readonly movementPattern?: string
  readonly secondaryPattern?: string
  readonly laterality?: string
  readonly isBallistic?: boolean
  readonly skillCost?: string
  readonly trainsLengthenedRange?: boolean
  readonly gripDemand?: string
  readonly sfrScore?: number
  readonly category?: string
  readonly mechanic?: string
  readonly primaryMuscles: readonly string[]
  readonly secondaryMuscles: readonly string[]
}

export interface GoalScores {
  readonly longevity: number
  readonly energy: number
  readonly functionality: number
  readonly aesthetics: number
  readonly blend: number
}

const LARGE_MASS: ReadonlySet<string> = new Set([
  "glutes",
  "quadriceps",
  "hamstrings",
  "lats",
  "chest",
  "lower-back",
  "middle-back",
])

const UPPER_VISIBLE: ReadonlySet<string> = new Set([
  "chest",
  "shoulders",
  "biceps",
  "triceps",
  "lats",
  "middle-back",
  "traps",
])

const VISIBLE_GAP: ReadonlySet<string> = new Set(["shoulders", "biceps", "triceps", "calves"])

const UPPER_BODY: ReadonlySet<string> = new Set([
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

const LOWER_BODY: ReadonlySet<string> = new Set([
  "glutes",
  "quadriceps",
  "hamstrings",
  "calves",
  "lower-back",
  "abductors",
  "adductors",
])

const FUNC_STRENGTH_PATTERNS: ReadonlySet<string> = new Set(["carry", "lunge", "hinge", "gait"])

const CORE_ANTI_PATTERNS: ReadonlySet<string> = new Set([
  "core-anti-extension",
  "core-anti-rotation",
  "core-anti-lateral-flexion",
])

function clamp01(n: number): number {
  return n < 0 ? 0 : n > 1 ? 1 : n
}

function hitsAny(muscles: readonly string[], set: ReadonlySet<string>): boolean {
  return muscles.some((m) => set.has(m))
}

function isFullBody(f: MovementFeatures): boolean {
  const all = [...f.primaryMuscles, ...f.secondaryMuscles]
  return hitsAny(all, UPPER_BODY) && hitsAny(all, LOWER_BODY)
}

export function longevityScore(f: MovementFeatures): number {
  let s = 0
  if (f.mechanic === "compound") s += 0.3
  if (f.isBallistic === true) s += 0.25
  if (hitsAny(f.primaryMuscles, LARGE_MASS)) s += 0.2
  if (f.movementPattern === "carry" || f.gripDemand === "high") s += 0.15
  if (f.sfrScore !== undefined) s += 0.1 * (f.sfrScore / 5)
  return clamp01(s)
}

export function energyScore(f: MovementFeatures): number {
  let s = 0
  if (f.category === "cardio") s += 0.45
  if (f.isBallistic === true || f.movementPattern === "gait") s += 0.25
  if (f.mechanic === "compound" && isFullBody(f)) s += 0.15
  return clamp01(s)
}

export function functionalityScore(f: MovementFeatures): number {
  let strength = 0
  if (f.mechanic === "compound") strength += 0.3
  if (f.laterality === "unilateral" || f.laterality === "alternating") strength += 0.25
  if (f.movementPattern !== undefined && FUNC_STRENGTH_PATTERNS.has(f.movementPattern)) {
    strength += 0.2
  }
  if (f.movementPattern !== undefined && CORE_ANTI_PATTERNS.has(f.movementPattern)) strength += 0.15
  if (f.skillCost === "moderate") strength += 0.1
  const mobility = f.trainsLengthenedRange === true ? 0.5 : 0
  return clamp01(0.6 * clamp01(strength) + 0.4 * clamp01(mobility))
}

export function aestheticsScore(f: MovementFeatures): number {
  let s = 0
  if (hitsAny(f.primaryMuscles, UPPER_VISIBLE)) s += 0.5
  if (f.isBallistic !== true) s += 0.3
  if (f.mechanic === "isolation" && hitsAny(f.primaryMuscles, VISIBLE_GAP)) s += 0.2
  return clamp01(s)
}

function weightSum(w: GoalWeights): number {
  const sum = w.longevity + w.energy + w.functionality + w.aesthetics
  return sum > 0 ? sum : 1
}

export function scoreMovement(f: MovementFeatures, weights: GoalWeights): GoalScores {
  const longevity = longevityScore(f)
  const energy = energyScore(f)
  const functionality = functionalityScore(f)
  const aesthetics = aestheticsScore(f)
  const sum = weightSum(weights)
  const blend =
    (weights.longevity * longevity +
      weights.energy * energy +
      weights.functionality * functionality +
      weights.aesthetics * aesthetics) /
    sum
  return { longevity, energy, functionality, aesthetics, blend }
}

export interface RecencyPolicy {
  readonly recencyWeight: number
  readonly recencySaturationDays: number
}

const DAY_STR_RE = /^(\d{4})-(\d{2})-(\d{2})$/
const DAY_STR_CAPTURES = z.tuple([z.coerce.number(), z.coerce.number(), z.coerce.number()])
const MS_PER_DAY = 86_400_000

function dayStrToUtcMs(dayStr: string): number {
  const [y, m, d] = requireMatchPositional(
    DAY_STR_RE,
    DAY_STR_CAPTURES,
    dayStr,
    `day string "${dayStr}" (expected YYYY-MM-DD)`
  )
  return Date.UTC(y, m - 1, d)
}

export function daysBetweenDayStrs(fromDayStr: string, toDayStr: string): number {
  return Math.round((dayStrToUtcMs(toDayStr) - dayStrToUtcMs(fromDayStr)) / MS_PER_DAY)
}

export function recencyBonus(
  priorDayStr: string | null,
  todayDayStr: string,
  policy: RecencyPolicy
): number {
  if (priorDayStr === null) return 0
  const { recencyWeight, recencySaturationDays } = policy
  if (recencySaturationDays <= 0) return 0
  const daysSince = daysBetweenDayStrs(priorDayStr, todayDayStr)
  if (daysSince <= 0) return 0
  return recencyWeight * (Math.min(daysSince, recencySaturationDays) / recencySaturationDays)
}

export function effectiveScore(blend: number, bonus: number): number {
  return blend + bonus
}

export function movementFeaturesIn(row: Row): MovementFeatures {
  return {
    movementPattern: textIn(row, "movementPattern"),
    secondaryPattern: textIn(row, "secondaryPattern"),
    laterality: textIn(row, "laterality"),
    isBallistic: boolIn(row, "isBallistic"),
    skillCost: textIn(row, "skillCost"),
    trainsLengthenedRange: boolIn(row, "trainsLengthenedRange"),
    gripDemand: textIn(row, "gripDemand"),
    sfrScore: numberIn(row, "sfrScore"),
    category: textIn(row, "exerciseCategory"),
    mechanic: textIn(row, "mechanic"),
    primaryMuscles: textsIn(row, "primaryMuscles"),
    secondaryMuscles: textsIn(row, "secondaryMuscles"),
  }
}
