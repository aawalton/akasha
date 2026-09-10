import type { List } from "@akasha/pages/page-property"
import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const primaryMuscles = {
  id: "01a0657e-2bc0-76e6-9024-ceadf74cf40b",
  pageTypeSlug: "select-property",
  type: "select-property",
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

export type PrimaryMuscle = (typeof primaryMuscles.values)[number]

export type PrimaryMuscles = List<PrimaryMuscle>
