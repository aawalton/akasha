import type { TextProperty } from "@akasha/pages-system/text-property"

export type SourceDescription = string

export const sourceDescription = {
  id: "01a05fd1-d43e-75e0-bfdb-ebee295f92d8",
  pageTypeSlug: "text-property",
  slug: "source-description",
  propertySlug: "source-description",
  definition: "where a style's motif pages are got, said for a reader",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
