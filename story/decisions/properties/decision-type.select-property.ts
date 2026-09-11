import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const decisionType = {
  id: "01a06577-f385-717f-8a5c-553d37a77bab",
  type: "select-property",
  slug: "decision-type",
  propertySlug: "decision-type",
  definition: "what a decision settled",
  values: ["stat", "other"],
  types: "ts",
} as const satisfies SelectProperty
