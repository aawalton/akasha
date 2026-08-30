import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type GalleryName = string

export const galleryName = {
  id: "01a05480-1c8b-7606-be31-29c7790bdc14",
  pageTypeSlug: "text-property",
  slug: "gallery-name",
  propertySlug: "gallery-name",
  definition: "the name a widget answers to in the widget gallery",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
