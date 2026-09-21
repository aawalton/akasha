import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const volumeTargetFall = {
  id: "01a0c432-c0ea-7cc9-9b88-40478cf751e0",
  type: "page-type/number-property",
  slug: "volume-target-fall",
  propertySlug: "volume-target-fall",
  definition: "the pounds a day's target drops by after a week that met it on no day",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
