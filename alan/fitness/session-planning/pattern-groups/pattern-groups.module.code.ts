import type { MovementPattern } from "../../exercises/properties/movement-pattern.select-property.ts"

export const CORE_ANTI_PATTERNS = [
  "core-anti-extension",
  "core-anti-rotation",
  "core-anti-lateral-flexion",
] as const satisfies readonly MovementPattern[]

export const CORE_ANTI_PATTERN_SET: ReadonlySet<MovementPattern> = new Set(CORE_ANTI_PATTERNS)

export const REQUIRED_WEEKLY_PATTERNS = [
  "h-push",
  "v-push",
  "h-pull",
  "v-pull",
  "squat",
  "hinge",
  "carry",
] as const satisfies readonly MovementPattern[]

export const UPPER_REGION_PATTERNS: ReadonlySet<MovementPattern> = new Set([
  "h-push",
  "v-push",
  "h-pull",
  "v-pull",
])

export const LOWER_REGION_PATTERNS: ReadonlySet<MovementPattern> = new Set([
  "squat",
  "hinge",
  "lunge",
])
