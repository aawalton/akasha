import {
  CORE_ANTI_PATTERN_SET,
  LOWER_REGION_PATTERNS,
  REQUIRED_WEEKLY_PATTERNS,
  UPPER_REGION_PATTERNS,
} from "./slot-templates"

export interface WeekMovement {
  readonly movementPattern: string
  readonly laterality: string
}

export interface CoverageState {
  readonly covered: readonly string[]
  readonly gaps: readonly string[]
  readonly coreAntiCovered: boolean
  readonly unilateralUpperCovered: boolean
  readonly unilateralLowerCovered: boolean
}

const UNILATERAL: ReadonlySet<string> = new Set(["unilateral", "alternating"])

export function isUnilateralLaterality(laterality: string): boolean {
  return UNILATERAL.has(laterality)
}

export function patternLateralityKey(pattern: string, laterality: string): string {
  return `${pattern}:${isUnilateralLaterality(laterality) ? "unilateral" : "bilateral"}`
}

export function computeCoverage(week: readonly WeekMovement[]): CoverageState {
  const patterns = new Set(week.map((m) => m.movementPattern))
  const covered = REQUIRED_WEEKLY_PATTERNS.filter((p) => patterns.has(p))
  const gaps = REQUIRED_WEEKLY_PATTERNS.filter((p) => !patterns.has(p))
  const coreAntiCovered = week.some((m) => CORE_ANTI_PATTERN_SET.has(m.movementPattern))
  const unilateralUpperCovered = week.some(
    (m) => UNILATERAL.has(m.laterality) && UPPER_REGION_PATTERNS.has(m.movementPattern)
  )
  const unilateralLowerCovered = week.some(
    (m) => UNILATERAL.has(m.laterality) && LOWER_REGION_PATTERNS.has(m.movementPattern)
  )
  return { covered, gaps, coreAntiCovered, unilateralUpperCovered, unilateralLowerCovered }
}

export function isGapPattern(coverage: CoverageState, pattern: string): boolean {
  if (coverage.gaps.includes(pattern)) return true
  if (CORE_ANTI_PATTERN_SET.has(pattern) && !coverage.coreAntiCovered) return true
  return false
}
