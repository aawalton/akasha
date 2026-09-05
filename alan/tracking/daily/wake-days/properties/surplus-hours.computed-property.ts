import type { ComputedProperty } from "@akasha/pages/computed-property"

export type SurplusHours = number

export const surplusHours = {
  id: "01a072ee-1b88-7b44-a2b4-9cb40106ef0e",
  pageTypeSlug: "computed-property",
  slug: "surplus-hours",
  propertySlug: "surplus-hours",
  definition: "how much of the night's sleep the day has not spent",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
