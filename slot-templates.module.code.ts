export const ROLE_OPTIONS = [
  "anchor",
  "accessory",
  "power",
  "mobility",
  "conditioning",
  "warmup",
] as const

export type Role = (typeof ROLE_OPTIONS)[number]

export interface RoleDefaults {
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

export const NATIVE_PATTERN_BY_ROLE: Readonly<Partial<Record<Role, string>>> = {
  mobility: "mobility",
  conditioning: "conditioning",
}

export const NATIVE_PATTERNS: ReadonlySet<string> = new Set(
  Object.values(NATIVE_PATTERN_BY_ROLE).filter((p): p is string => p !== undefined)
)

export interface SlotSpec {
  readonly role: Role
  readonly patterns: readonly string[]
  readonly muscleFocus?: string
  readonly coverageFlex?: boolean
  readonly ballisticPreference?: "prefer" | "avoid"
  readonly optional?: boolean
}

const CORE_ANTI_PATTERNS = [
  "core-anti-extension",
  "core-anti-rotation",
  "core-anti-lateral-flexion",
] as const

export const FOCUS_TEMPLATES: Readonly<Record<string, readonly SlotSpec[]>> = {
  push: [
    { role: "anchor", patterns: ["h-push"] },
    { role: "accessory", patterns: ["v-push"] },
    { role: "accessory", patterns: ["h-push", "v-push"], coverageFlex: true },
    { role: "accessory", patterns: ["isolation-other"], muscleFocus: "push" },
    { role: "accessory", patterns: [...CORE_ANTI_PATTERNS], coverageFlex: true },
    {
      role: "conditioning",
      patterns: ["conditioning"],
      ballisticPreference: "avoid",
      optional: true,
    },
  ],
  pull: [
    { role: "anchor", patterns: ["v-pull"] },
    { role: "accessory", patterns: ["h-pull"] },
    { role: "accessory", patterns: ["v-pull", "h-pull"], coverageFlex: true },
    { role: "accessory", patterns: ["isolation-other"], muscleFocus: "pull" },
    { role: "accessory", patterns: [...CORE_ANTI_PATTERNS], coverageFlex: true },
    {
      role: "conditioning",
      patterns: ["conditioning"],
      ballisticPreference: "avoid",
      optional: true,
    },
  ],
  legs: [
    { role: "anchor", patterns: ["squat"] },
    { role: "accessory", patterns: ["hinge"] },
    { role: "accessory", patterns: ["lunge"] },
    { role: "accessory", patterns: ["hinge", "squat", "lunge"], coverageFlex: true },
    { role: "accessory", patterns: ["carry", ...CORE_ANTI_PATTERNS], coverageFlex: true },
    {
      role: "conditioning",
      patterns: ["conditioning"],
      ballisticPreference: "avoid",
      optional: true,
    },
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
    {
      role: "conditioning",
      patterns: ["conditioning"],
      ballisticPreference: "avoid",
      optional: true,
    },
  ],
  "full-body": [
    { role: "anchor", patterns: ["squat", "hinge"], coverageFlex: true },
    { role: "accessory", patterns: ["h-push", "v-push"], coverageFlex: true },
    { role: "accessory", patterns: ["v-pull", "h-pull"], coverageFlex: true },
    { role: "accessory", patterns: ["hinge", "lunge"], coverageFlex: true },
    { role: "accessory", patterns: ["carry", ...CORE_ANTI_PATTERNS], coverageFlex: true },
    {
      role: "conditioning",
      patterns: ["conditioning"],
      ballisticPreference: "avoid",
      optional: true,
    },
  ],
  core: [
    { role: "accessory", patterns: ["core-anti-extension"] },
    { role: "accessory", patterns: ["core-anti-rotation"] },
    { role: "accessory", patterns: ["core-anti-lateral-flexion", "carry"], coverageFlex: true },
    {
      role: "conditioning",
      patterns: ["conditioning"],
      ballisticPreference: "avoid",
      optional: true,
    },
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
  return FOCUS_TEMPLATES[focus] ?? FOCUS_TEMPLATES["full-body"] ?? []
}

export const REQUIRED_WEEKLY_PATTERNS = [
  "h-push",
  "v-push",
  "h-pull",
  "v-pull",
  "squat",
  "hinge",
  "carry",
] as const

export const CORE_ANTI_PATTERN_SET: ReadonlySet<string> = new Set(CORE_ANTI_PATTERNS)

export const UPPER_REGION_PATTERNS: ReadonlySet<string> = new Set([
  "h-push",
  "v-push",
  "h-pull",
  "v-pull",
])

export const LOWER_REGION_PATTERNS: ReadonlySet<string> = new Set(["squat", "hinge", "lunge"])
