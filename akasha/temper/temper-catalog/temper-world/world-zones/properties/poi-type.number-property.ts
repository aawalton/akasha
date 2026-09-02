import type { NumberProperty } from "@akasha/pages-system/number-property"

export type PoiType = number

export const poiType = {
  id: "01a06167-3f9b-7000-9f20-1b7599e09e3c",
  pageTypeSlug: "number-property",
  slug: "poi-type",
  propertySlug: "poi-type",
  definition: "the number the game gives a kind of point of interest",
  max: null,
} as const satisfies NumberProperty
