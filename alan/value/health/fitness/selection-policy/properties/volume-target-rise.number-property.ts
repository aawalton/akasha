import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const volumeTargetRise = {
  id: "01a0c432-abf3-7cff-98cc-50889999914f",
  type: "page-type/number-property",
  slug: "volume-target-rise",
  propertySlug: "volume-target-rise",
  definition: "the pounds a day's target climbs by after a day that met it",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
