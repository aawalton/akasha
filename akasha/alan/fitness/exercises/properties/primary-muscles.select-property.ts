import type { SelectProperty } from "@akasha/pages-system/select-property"

export const primaryMuscles = {
  id: "01a0657b-1ad2-73b7-b592-0f37857e4d31",
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
