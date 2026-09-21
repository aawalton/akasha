import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const volumeTargetSeed = {
  id: "01a0c432-954d-72ec-a7cf-1379bf4f538b",
  type: "page-type/number-property",
  slug: "volume-target-seed",
  propertySlug: "volume-target-seed",
  definition: "the pounds a day's target opens at before any day has moved it",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
