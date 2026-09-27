import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const rawQualityValue = {
  id: "01a0e0f3-80ea-7243-9a77-8eac3d1915dc",
  type: "page-type/number-property",
  slug: "raw-quality-value",
  propertySlug: "raw-value",
  definition: "the unrounded worth the game scales a grade from, where it rounds what it shows",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
