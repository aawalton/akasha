import type { TextProperty } from "@akasha/pages-system/text-property"

export type SeriesStatus = string

export const seriesStatus = {
  id: "01a06577-f385-7d01-a1b2-d9e18debef2b",
  pageTypeSlug: "text-property",
  slug: "series-status",
  propertySlug: "series-status",
  definition: "how far along the series a story is one of has got",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
