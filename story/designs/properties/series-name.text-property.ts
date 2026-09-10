import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type SeriesName = string

export const seriesName = {
  id: "01a06577-f385-7024-8da1-d79b0757133e",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "series-name",
  propertySlug: "series-name",
  definition: "the series a story is one of",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
