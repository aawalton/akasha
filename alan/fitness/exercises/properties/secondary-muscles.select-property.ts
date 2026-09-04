import type { SelectProperty } from "@akasha/pages-system/select-property"

export const secondaryMuscles = {
  id: "01a0657e-2bc0-7f8d-b285-520734083a31",
  pageTypeSlug: "select-property",
  slug: "secondary-muscles",
  propertySlug: "secondary-muscles",
  definition: "what the movement works alongside its target",
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

export type SecondaryMuscles = (typeof secondaryMuscles.values)[number]
