export const FOCUS_OPTIONS = [
  "push",
  "pull",
  "legs",
  "upper",
  "lower",
  "full-body",
  "core",
  "conditioning",
  "flex",
] as const

export const ACTIVITY_TYPE_OPTIONS = ["strength", "cardio", "mobility"] as const

export const SCHEDULE_DAY_FOCUS_OPTIONS = [...FOCUS_OPTIONS, "rest"] as const

export const EQUIPMENT_CATEGORY_OPTIONS = [
  "dumbbells",
  "kettlebells",
  "bench",
  "band",
  "vest",
  "cardio-machine",
  "other",
] as const

export const EQUIPMENT_CONFIG_OPTIONS = ["pair", "single", "adjustable", "n-a"] as const

export const MOBILITY_METRIC_OPTIONS = [
  "forward-fold",
  "supine-slr",
  "wall-slide-overhead",
  "hamstring-lr-gap",
] as const

export const MOBILITY_SIDE_OPTIONS = ["left", "right", "n-a"] as const

export const MOBILITY_CONTEXT_OPTIONS = ["warmup", "cooldown", "standalone"] as const

export const CONSTRAINT_KIND_OPTIONS = [
  "medical-gate",
  "programming-cue",
  "equipment-ceiling",
  "injury-watch",
  "ef-accommodation",
] as const

export const CONSTRAINT_FOCUS_OPTIONS = [...FOCUS_OPTIONS, "all"] as const
