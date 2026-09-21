import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const msrp = {
  id: "01a0c53f-4c5c-7ef7-8860-5a7fdcf7f623",
  type: "page-type/number-property",
  slug: "msrp",
  propertySlug: "msrp",
  definition: "the price the maker asks for this trim, in dollars",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
