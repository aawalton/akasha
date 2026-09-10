import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type AltitudeAccuracyM = number

export const altitudeAccuracyM = {
  id: "01a06935-68b3-7849-a594-127cde90c04c",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "altitude-accuracy-m",
  propertySlug: "altitude-accuracy-m",
  definition: "how far from the stated altitude the device thinks the truth could be, in metres",
  max: null,
} as const satisfies NumberProperty
