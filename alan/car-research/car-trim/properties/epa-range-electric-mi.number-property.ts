import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const epaRangeElectricMi = {
  id: "01a0c545-c0e6-76bc-a325-1baeaae6d389",
  type: "page-type/number-property",
  slug: "epa-range-electric-mi",
  propertySlug: "epa-range-electric-mi",
  definition: "how far the EPA says the car goes on the battery alone, in miles",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
