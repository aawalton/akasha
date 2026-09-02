import type { TextProperty } from "@akasha/pages-system/text-property"

export type SourceName = string

export const sourceName = {
  id: "01a060fb-040f-7e46-8cbb-1cc3db787009",
  pageTypeSlug: "text-property",
  slug: "source-name",
  propertySlug: "source-name",
  definition: "what recorded a reading",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
