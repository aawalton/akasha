import type { SelectProperty } from "@akasha/pages-system/select-property"

export const exerciseCategory = {
  id: "01a0657b-1ad2-7c07-9614-2b442a9b20ad",
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
