import type { SelectProperty } from "@akasha/pages-system/select-property"

export const exerciseLevel = {
  id: "01a0657b-1ad2-79f9-b0e4-eef1c6391ed7",
  pageTypeSlug: "select-property",
  slug: "exercise-level",
  propertySlug: "exercise-level",
  definition: "how much practice the movement takes before it is worth loading",
  values: ["beginner", "expert", "intermediate"],
} as const satisfies SelectProperty

export type ExerciseLevel = (typeof exerciseLevel.values)[number]
