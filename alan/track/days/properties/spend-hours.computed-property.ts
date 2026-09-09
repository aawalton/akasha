import type { ComputedProperty } from "@akasha/pages/computed-property"

export type SpendHours = number

export const spendHours = {
  id: "01a072ee-1b88-78a4-9ebc-c270a0a4e3fb",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "spend-hours",
  propertySlug: "spend-hours",
  definition: "what every stretch of the day cost, added up",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
