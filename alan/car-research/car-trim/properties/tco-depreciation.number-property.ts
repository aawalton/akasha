import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const tcoDepreciation = {
  id: "01a0c547-673f-7598-a386-6ac0b3acd568",
  type: "page-type/number-property",
  slug: "tco-depreciation",
  propertySlug: "tco-depreciation",
  definition: "what the car is reckoned to lose in value over those years, in dollars",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
