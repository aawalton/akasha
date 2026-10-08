import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const decisionType = {
  id: "01a06577-f385-717f-8a5c-553d37a77bab",
  type: "page-type/select-property",
  slug: "decision-type",
  propertySlug: "decision-type",
  definition: "what a decision settled",
  values: ["stat", "other"],
  types: "ts",
  createdAt: "2026-09-03T04:12:35.077Z",
  updatedAt: "2026-09-19T05:02:31.000Z",
} as const satisfies SelectProperty
