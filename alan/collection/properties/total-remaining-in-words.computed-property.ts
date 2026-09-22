import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const totalRemainingInWords = {
  id: "01a07231-dd66-79f2-9c4d-a9e07c6fc46b",
  type: "page-type/computed-property",
  slug: "total-remaining-in-words",
  propertySlug: "total-remaining-in-words",
  definition: "how much of the collection and everything it holds is left",
  holds: "number",
  code: "ts",
  types: "ts",
} as const satisfies ComputedProperty
