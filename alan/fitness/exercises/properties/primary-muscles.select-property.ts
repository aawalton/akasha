import type { SelectProperty } from "@akasha/pages-system/select-property"

export const primaryMuscles = {
  id: "01a0657e-2bc0-76e6-9024-ceadf74cf40b",
  pageTypeSlug: "select-property",
  slug: "primary-muscles",
  propertySlug: "primary-muscles",
  definition: "what the movement is meant to work",
  values: [
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
    "lower-back",
    "middle-back",
    "neck",
    "quadriceps",
    "shoulders",
    "traps",
    "triceps",
  ],
} as const satisfies SelectProperty

export type PrimaryMuscles = (typeof primaryMuscles.values)[number]
