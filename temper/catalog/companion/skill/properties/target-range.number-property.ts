import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const targetRange = {
  id: "01a06193-6cab-7234-80a7-375ffe81337b",
  type: "page-type/number-property",
  slug: "target-range",
  propertySlug: "range",
  definition: "how far away an effect reaches",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
