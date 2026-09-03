import type { SelectProperty } from "@akasha/pages-system/select-property"

export const exerciseSource = {
  id: "01a0657b-1ad2-76e6-bc40-9236717079fc",
  pageTypeSlug: "select-property",
  slug: "exercise-source",
  propertySlug: "exercise-source",
  definition: "where the movement was authored",
  values: ["aelwyn-custom", "free-exercise-db"],
} as const satisfies SelectProperty

export type ExerciseSource = (typeof exerciseSource.values)[number]
