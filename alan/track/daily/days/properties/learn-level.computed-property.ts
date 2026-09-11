import type { ComputedProperty } from "akasha/pages/computed-properties/computed-property.page-type.types.ts"

export const learnLevel = {
  id: "01a0720f-5ad1-775d-a283-00b4de11a246",
  type: "computed-property",
  slug: "learn-level",
  propertySlug: "learn-level",
  definition: "which of the four rungs the day's learn points reached",
  holds: "number",
  code: "ts",
  types: "ts",
} as const satisfies ComputedProperty
