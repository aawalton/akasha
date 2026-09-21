import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const epaRangeTotalMi = {
  id: "01a0c545-d1b1-7df6-aa2f-9e600c8c6c3e",
  type: "page-type/number-property",
  slug: "epa-range-total-mi",
  propertySlug: "epa-range-total-mi",
  definition: "how far the EPA says the car goes on a full battery and a full tank, in miles",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
