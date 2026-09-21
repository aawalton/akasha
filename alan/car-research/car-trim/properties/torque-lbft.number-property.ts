import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const torqueLbft = {
  id: "01a0c547-ef7a-7d40-b88f-c3376f9f9e31",
  type: "page-type/number-property",
  slug: "torque-lbft",
  propertySlug: "torque-lbft",
  definition: "how much turning force the car makes, in pound-feet",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
