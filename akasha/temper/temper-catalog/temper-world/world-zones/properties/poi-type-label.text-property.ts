import type { TextProperty } from "@akasha/pages-system/text-property"

export type PoiTypeLabel = string

export const poiTypeLabel = {
  id: "01a06167-3f9b-7006-b951-0109d7c05944",
  pageTypeSlug: "text-property",
  slug: "poi-type-label",
  propertySlug: "poi-type-label",
  definition: "the name a kind of point of interest is shown under",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
