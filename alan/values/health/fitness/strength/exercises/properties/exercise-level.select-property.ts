import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const exerciseLevel = {
  id: "01a0657e-2bbf-7f68-a4a5-f41e8a919b89",
  type: "select-property",
  slug: "exercise-level",
  propertySlug: "exercise-level",
  definition: "how much practice the movement takes before it is worth loading",
  values: ["beginner", "expert", "intermediate"],
  types: "ts",
} as const satisfies SelectProperty
