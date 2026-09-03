import { FOCUS_OPTIONS } from "@akasha/exercise-access/exercise-vocabulary"
import type { MovementPattern } from "../../exercises/properties/movement-pattern.select-property.ts"
import type { MuscleFocus } from "../../exercises/properties/muscle-focus.select-property.ts"
import { CORE_ANTI_PATTERNS } from "../pattern-groups/pattern-groups.module.code.ts"

export type SessionFocus = (typeof FOCUS_OPTIONS)[number]

const SESSION_FOCUS_SET: ReadonlySet<string> = new Set(FOCUS_OPTIONS)

export function isSessionFocus(focus: string): focus is SessionFocus {
  return SESSION_FOCUS_SET.has(focus)
}

export const ROLE_OPTIONS = [
  "anchor",
  "accessory",
  "power",
  "mobility",
  "conditioning",
  "warmup",
] as const

export type Role = (typeof ROLE_OPTIONS)[number]

export type RoleDefaults = {
  readonly targetSets: number
  readonly repRangeLow: number
  readonly repRangeHigh: number
  readonly targetRir: number
}

export const ROLE_DEFAULTS: Readonly<Record<Role, RoleDefaults>> = {
  anchor: { targetSets: 3, repRangeLow: 8, repRangeHigh: 15, targetRir: 2 },
  accessory: { targetSets: 2, repRangeLow: 10, repRangeHigh: 15, targetRir: 2 },
  power: { targetSets: 4, repRangeLow: 3, repRangeHigh: 5, targetRir: 3 },
  mobility: { targetSets: 2, repRangeLow: 8, repRangeHigh: 12, targetRir: 3 },
  conditioning: { targetSets: 1, repRangeLow: 0, repRangeHigh: 0, targetRir: 3 },
  warmup: { targetSets: 1, repRangeLow: 8, repRangeHigh: 12, targetRir: 4 },
}

export const NATIVE_PATTERN_BY_ROLE: Readonly<Partial<Record<Role, MovementPattern>>> = {
  mobility: "mobility",
  conditioning: "conditioning",
}

export const NATIVE_PATTERNS: ReadonlySet<MovementPattern> = new Set(
  Object.values(NATIVE_PATTERN_BY_ROLE).filter(
    (pattern): pattern is MovementPattern => pattern !== undefined
  )
)

export type SlotSpec = {
  readonly role: Role
  readonly patterns: readonly MovementPattern[]
  readonly muscleFocus?: MuscleFocus
  readonly coverageFlex?: boolean
  readonly ballisticPreference?: "prefer" | "avoid"
  readonly optional?: boolean
}

const ZONE_TWO_FINISHER: SlotSpec = {
  role: "conditioning",
  patterns: ["conditioning"],
  ballisticPreference: "avoid",
  optional: true,
}

export const FOCUS_TEMPLATES: Readonly<Record<SessionFocus, readonly SlotSpec[]>> = {
  push: [
    { role: "anchor", patterns: ["h-push"] },
    { role: "accessory", patterns: ["v-push"] },
    { role: "accessory", patterns: ["h-push", "v-push"], coverageFlex: true },
    { role: "accessory", patterns: ["isolation-other"], muscleFocus: "push" },
    { role: "accessory", patterns: [...CORE_ANTI_PATTERNS], coverageFlex: true },
    ZONE_TWO_FINISHER,
  ],
  pull: [
    { role: "anchor", patterns: ["v-pull"] },
    { role: "accessory", patterns: ["h-pull"] },
    { role: "accessory", patterns: ["v-pull", "h-pull"], coverageFlex: true },
    { role: "accessory", patterns: ["isolation-other"], muscleFocus: "pull" },
    { role: "accessory", patterns: [...CORE_ANTI_PATTERNS], coverageFlex: true },
    ZONE_TWO_FINISHER,
  ],
  legs: [
    { role: "anchor", patterns: ["squat"] },
    { role: "accessory", patterns: ["hinge"] },
    { role: "accessory", patterns: ["lunge"] },
    { role: "accessory", patterns: ["hinge", "squat", "lunge"], coverageFlex: true },
    { role: "accessory", patterns: ["carry", ...CORE_ANTI_PATTERNS], coverageFlex: true },
    ZONE_TWO_FINISHER,
  ],
  upper: [
    { role: "anchor", patterns: ["h-push"] },
    { role: "accessory", patterns: ["v-pull"] },
    { role: "accessory", patterns: ["v-push"] },
    { role: "accessory", patterns: ["h-pull"] },
    { role: "accessory", patterns: ["isolation-other"] },
    { role: "accessory", patterns: [...CORE_ANTI_PATTERNS], coverageFlex: true },
  ],
  lower: [
    { role: "anchor", patterns: ["squat"] },
    { role: "accessory", patterns: ["hinge"] },
    { role: "accessory", patterns: ["lunge"] },
    { role: "accessory", patterns: ["carry", ...CORE_ANTI_PATTERNS], coverageFlex: true },
    ZONE_TWO_FINISHER,
  ],
  "full-body": [
    { role: "anchor", patterns: ["squat", "hinge"], coverageFlex: true },
    { role: "accessory", patterns: ["h-push", "v-push"], coverageFlex: true },
    { role: "accessory", patterns: ["v-pull", "h-pull"], coverageFlex: true },
    { role: "accessory", patterns: ["hinge", "lunge"], coverageFlex: true },
    { role: "accessory", patterns: ["carry", ...CORE_ANTI_PATTERNS], coverageFlex: true },
    ZONE_TWO_FINISHER,
  ],
  core: [
    { role: "accessory", patterns: ["core-anti-extension"] },
    { role: "accessory", patterns: ["core-anti-rotation"] },
    { role: "accessory", patterns: ["core-anti-lateral-flexion", "carry"], coverageFlex: true },
    ZONE_TWO_FINISHER,
  ],
  conditioning: [
    { role: "conditioning", patterns: ["conditioning"] },
    { role: "power", patterns: ["hinge", "v-push"], ballisticPreference: "prefer", optional: true },
    { role: "accessory", patterns: [...CORE_ANTI_PATTERNS], coverageFlex: true, optional: true },
  ],
  flex: [
    { role: "mobility", patterns: ["mobility"], ballisticPreference: "avoid" },
    { role: "mobility", patterns: ["mobility"], ballisticPreference: "avoid" },
  ],
}

export function slotsForFocus(focus: string): readonly SlotSpec[] {
  return isSessionFocus(focus) ? FOCUS_TEMPLATES[focus] : FOCUS_TEMPLATES["full-body"]
}
