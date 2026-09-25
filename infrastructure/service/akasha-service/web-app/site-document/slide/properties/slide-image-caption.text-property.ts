import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const slideImageCaption = {
  id: "01a0d622-64e3-7892-b9da-5bcee33a2bdc",
  type: "page-type/text-property",
  slug: "slide-image-caption",
  propertySlug: "image-caption",
  definition: "what a slide's picture shows, said for a reader",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
