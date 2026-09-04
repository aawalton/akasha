import type { TextProperty } from "@akasha/pages-system/text-property"

export type GalleryCoverSource = string

export const galleryCoverSource = {
  id: "01a0680d-4d00-7010-a534-3c8b5e9d4111",
  pageTypeSlug: "text-property",
  slug: "gallery-cover-source",
  propertySlug: "gallery-cover-source",
  definition: "the property a gallery takes its picture from",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
