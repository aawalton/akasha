import type { ComputedProperty } from "akasha/pages/computed-properties/computed-property.page-type.types.ts"

export const healthLevel = {
  id: "01a0720f-5ad0-7667-8ad8-69cd26bf585c",
  type: "computed-property",
  slug: "health-level",
  propertySlug: "health-level",
  definition: "which of the four rungs the day's health points reached",
  holds: "number",
  code: "ts",
  types: "ts",
} as const satisfies ComputedProperty
