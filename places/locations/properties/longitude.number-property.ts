import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type Longitude = number

export const longitude = {
  id: "01a06583-acfb-7221-95f0-7d75e93fc099",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "longitude",
  propertySlug: "longitude",
  definition: "how far east of the prime meridian the place is, in degrees",
  max: null,
} as const satisfies NumberProperty
