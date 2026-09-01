import type { TextProperty } from "@akasha/pages-system/text-property"

export type GalleryDescription = string

export const galleryDescription = {
  id: "01a05480-1c8c-751e-997b-6255f3440ff4",
  pageTypeSlug: "text-property",
  slug: "gallery-description",
  propertySlug: "gallery-description",
  definition: "the sentence the gallery prints under a widget's name",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
