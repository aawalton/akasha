import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type SeriesStatus = string

export const seriesStatus = {
  id: "01a06577-f385-7d01-a1b2-d9e18debef2b",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "series-status",
  propertySlug: "series-status",
  definition: "how far along the series a story is one of has got",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
