import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const tcoInsurance = {
  id: "01a0c547-9a1b-745e-a8e0-7c533b37dcc9",
  type: "page-type/number-property",
  slug: "tco-insurance",
  propertySlug: "tco-insurance",
  definition: "what insuring the car is reckoned to cost over those years, in dollars",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
