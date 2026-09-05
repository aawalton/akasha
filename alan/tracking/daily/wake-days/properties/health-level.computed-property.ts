import type { ComputedProperty } from "@akasha/pages-system/computed-property"

export type HealthLevel = number

export const healthLevel = {
  id: "01a0720f-5ad0-7667-8ad8-69cd26bf585c",
  pageTypeSlug: "computed-property",
  slug: "health-level",
  propertySlug: "health-level",
  definition: "which of the four rungs the day's health points reached",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
