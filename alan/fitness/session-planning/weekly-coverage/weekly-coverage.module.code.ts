import type { Laterality } from "../../exercises/properties/laterality.select-property.ts"
import type { MovementPattern } from "../../exercises/properties/movement-pattern.select-property.ts"
import {
  CORE_ANTI_PATTERN_SET,
  LOWER_REGION_PATTERNS,
  REQUIRED_WEEKLY_PATTERNS,
  UPPER_REGION_PATTERNS,
} from "../pattern-groups/pattern-groups.module.code.ts"

export type WeekMovement = {
  readonly movementPattern: MovementPattern
  readonly laterality: Laterality
}

export type CoverageState = {
  readonly covered: readonly MovementPattern[]
  readonly gaps: readonly MovementPattern[]
  readonly coreAntiCovered: boolean
  readonly unilateralUpperCovered: boolean
  readonly unilateralLowerCovered: boolean
}

const UNILATERAL: ReadonlySet<Laterality> = new Set(["unilateral", "alternating"])

export function isUnilateralLaterality(laterality: Laterality): boolean {
  return UNILATERAL.has(laterality)
}

export function patternLateralityKey(pattern: MovementPattern, laterality: Laterality): string {
  return `${pattern}:${isUnilateralLaterality(laterality) ? "unilateral" : "bilateral"}`
}

export function computeCoverage(week: readonly WeekMovement[]): CoverageState {
  const trained = new Set(week.map((movement) => movement.movementPattern))
  return {
    covered: REQUIRED_WEEKLY_PATTERNS.filter((pattern) => trained.has(pattern)),
    gaps: REQUIRED_WEEKLY_PATTERNS.filter((pattern) => !trained.has(pattern)),
    coreAntiCovered: week.some((movement) => CORE_ANTI_PATTERN_SET.has(movement.movementPattern)),
    unilateralUpperCovered: week.some(
      (movement) =>
        isUnilateralLaterality(movement.laterality) &&
        UPPER_REGION_PATTERNS.has(movement.movementPattern)
    ),
    unilateralLowerCovered: week.some(
      (movement) =>
        isUnilateralLaterality(movement.laterality) &&
        LOWER_REGION_PATTERNS.has(movement.movementPattern)
    ),
  }
}

export function isGapPattern(coverage: CoverageState, pattern: MovementPattern): boolean {
  if (coverage.gaps.includes(pattern)) return true
  return CORE_ANTI_PATTERN_SET.has(pattern) && !coverage.coreAntiCovered
}
