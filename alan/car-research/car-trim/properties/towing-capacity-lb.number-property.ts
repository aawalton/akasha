import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const towingCapacityLb = {
  id: "01a0c548-01a3-7d0d-99da-719157b230c8",
  type: "page-type/number-property",
  slug: "towing-capacity-lb",
  propertySlug: "towing-capacity-lb",
  definition: "how much the car may tow behind it, in pounds",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
