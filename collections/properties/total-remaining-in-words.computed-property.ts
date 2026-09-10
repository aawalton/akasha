import type { ComputedProperty } from "akasha/pages/computed-properties/computed-property.page-type.types.ts"

export type TotalRemainingInWords = number

export const totalRemainingInWords = {
  id: "01a07231-dd66-79f2-9c4d-a9e07c6fc46b",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "total-remaining-in-words",
  propertySlug: "total-remaining-in-words",
  definition: "how much of the collection and everything it holds is left to work through",
  holds: "number",
  code: "ts",
} as const satisfies ComputedProperty
