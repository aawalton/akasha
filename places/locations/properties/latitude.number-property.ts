import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Latitude = number

export const latitude = {
  id: "01a06583-acfb-72db-90d5-cd59efa93680",
  pageTypeSlug: "number-property",
  slug: "latitude",
  propertySlug: "latitude",
  definition: "how far north of the equator the place is, in degrees",
  max: null,
} as const satisfies NumberProperty
