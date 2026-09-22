import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const tcoAnnualMiles = {
  id: "01a0c547-463e-7fad-bcc5-61e23a472a98",
  type: "page-type/number-property",
  slug: "tco-annual-miles",
  propertySlug: "tco-annual-miles",
  definition: "the yearly miles behind the cost of owning the car",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
