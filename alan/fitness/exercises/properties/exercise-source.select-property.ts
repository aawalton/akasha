import type { SelectProperty } from "@akasha/pages-system/select-property"

export const exerciseSource = {
  id: "01a0657e-2bc0-75b4-a836-a1b4c4977d7c",
  pageTypeSlug: "select-property",
  slug: "exercise-source",
  propertySlug: "exercise-source",
  definition: "where the movement was authored",
  values: ["aelwyn-custom", "free-exercise-db"],
} as const satisfies SelectProperty

export type ExerciseSource = (typeof exerciseSource.values)[number]
