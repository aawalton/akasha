import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const healthLevel = {
  id: "01a0720f-5ad0-7667-8ad8-69cd26bf585c",
  type: "page-type/computed-property",
  slug: "health-level",
  propertySlug: "health-level",
  definition: "which of the four rungs the day's health points reached",
  holds: "number",
  code: "ts",
  types: "ts",
  createdAt: "2026-09-05T14:53:24.048Z",
  updatedAt: "2026-09-15T16:29:06.000Z",
} as const satisfies ComputedProperty
