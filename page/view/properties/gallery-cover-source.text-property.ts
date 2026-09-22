import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const galleryCoverSource = {
  id: "01a0680d-4d00-7010-a534-3c8b5e9d4111",
  type: "page-type/text-property",
  slug: "gallery-cover-source",
  propertySlug: "gallery-cover-source",
  definition: "the property holding a gallery's picture",
  namesAPropertyKey: true,
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
