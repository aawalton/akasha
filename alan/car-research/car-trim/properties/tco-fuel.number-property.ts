import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const tcoFuel = {
  id: "01a0c547-8a3b-77e2-8d08-f7bf8ee8f7b9",
  type: "page-type/number-property",
  slug: "tco-fuel",
  propertySlug: "tco-fuel",
  definition: "what fuel and charging are reckoned to cost over those years, in dollars",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
