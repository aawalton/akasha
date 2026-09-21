import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const curbWeightLb = {
  id: "01a0c545-7d1e-7335-8e6a-712cc6f5b50e",
  type: "page-type/number-property",
  slug: "curb-weight-lb",
  propertySlug: "curb-weight-lb",
  definition: "what the car weighs ready to drive and carrying nobody, in pounds",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
