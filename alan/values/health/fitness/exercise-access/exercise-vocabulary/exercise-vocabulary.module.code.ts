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

export const SCHEDULE_DAY_FOCUS_OPTIONS = [...FOCUS_OPTIONS, "rest"] as const

export const CONSTRAINT_FOCUS_OPTIONS = [...FOCUS_OPTIONS, "all"] as const

export const ACTIVITY_TYPE_OPTIONS = ["strength", "cardio", "mobility"] as const

export const CONSTRAINT_KIND_OPTIONS = [
  "medical-gate",
  "programming-cue",
  "equipment-ceiling",
  "injury-watch",
  "ef-accommodation",
] as const

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

export const DAYS_OF_WEEK = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const

export const CATEGORY_OPTIONS = [
  "cardio",
  "olympic weightlifting",
  "plyometrics",
  "powerlifting",
  "strength",
  "stretching",
  "strongman",
] as const

export const EQUIPMENT_OPTIONS = [
  "bands",
  "barbell",
  "body only",
  "cable",
  "dumbbell",
  "e-z curl bar",
  "exercise ball",
  "foam roll",
  "kettlebells",
  "machine",
  "medicine ball",
  "other",
] as const

export const FORCE_OPTIONS = ["pull", "push", "static"] as const

export const LEVEL_OPTIONS = ["beginner", "intermediate", "expert"] as const

export const MECHANIC_OPTIONS = ["compound", "isolation"] as const

export const MUSCLE_OPTIONS = [
  "abdominals",
  "abductors",
  "adductors",
  "biceps",
  "calves",
  "chest",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "lower back",
  "middle back",
  "neck",
  "quadriceps",
  "shoulders",
  "traps",
  "triceps",
] as const
