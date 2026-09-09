import type { TextProperty } from "@akasha/pages/text-property"

export type GalleryName = string

export const galleryName = {
  id: "01a05480-1c8b-7606-be31-29c7790bdc14",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "gallery-name",
  propertySlug: "gallery-name",
  definition: "the name a widget answers to in the widget gallery",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
