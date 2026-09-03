import type { TextProperty } from "@akasha/pages-system/text-property"

export type SeriesName = string

export const seriesName = {
  id: "01a06577-f385-7024-8da1-d79b0757133e",
  pageTypeSlug: "text-property",
  slug: "series-name",
  propertySlug: "series-name",
  definition: "the series a story is one of",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
