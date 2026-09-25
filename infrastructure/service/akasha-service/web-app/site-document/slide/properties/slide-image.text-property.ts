import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const slideImage = {
  id: "01a0d622-64e3-747b-bcad-ff2351609e27",
  type: "page-type/text-property",
  slug: "slide-image",
  propertySlug: "image",
  definition: "the path on its site of the picture a slide shows",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
