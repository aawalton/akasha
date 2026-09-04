import type { SelectProperty } from "@akasha/pages-system/select-property"

export const exerciseCategory = {
  id: "01a0657e-2bbf-7a67-8e51-2974d08e36a8",
  pageTypeSlug: "select-property",
  slug: "exercise-category",
  propertySlug: "exercise-category",
  definition: "the broad training discipline the movement belongs to",
  values: [
    "cardio",
    "olympic-weightlifting",
    "plyometrics",
    "powerlifting",
    "strength",
    "stretching",
    "strongman",
  ],
} as const satisfies SelectProperty

export type ExerciseCategory = (typeof exerciseCategory.values)[number]
