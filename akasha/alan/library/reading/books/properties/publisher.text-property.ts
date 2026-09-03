import type { TextProperty } from "@akasha/pages-system/text-property"

export type Publisher = string

export const publisher = {
  id: "01a06741-dd0f-7002-ab36-1b19838e23db",
  pageTypeSlug: "text-property",
  slug: "publisher",
  propertySlug: "publisher",
  definition: "who put an edition out",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
