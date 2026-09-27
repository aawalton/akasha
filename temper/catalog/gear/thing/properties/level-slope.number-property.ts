import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const levelSlope = {
  id: "01a0e113-0582-732a-b3ee-53a25ad6742f",
  type: "page-type/number-property",
  slug: "level-slope",
  propertySlug: "level-slope",
  definition: "how much a legendary piece's base worth grows with each level it is made at",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
