import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const levelBandPrefix = {
  id: "01a0e16a-6333-7e34-8203-0b59f3e52d71",
  type: "page-type/text-property",
  slug: "level-band-prefix",
  propertySlug: "level-band-prefix",
  definition: "the letters an item level in the band opens with, before its number",
  maxLength: 10,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
