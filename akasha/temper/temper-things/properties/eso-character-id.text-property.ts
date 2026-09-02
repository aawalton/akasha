import type { TextProperty } from "@akasha/pages-system/text-property"

export type EsoCharacterId = string

export const esoCharacterId = {
  id: "01a05fba-ce39-7efc-aa9e-99bf36eda42a",
  pageTypeSlug: "text-property",
  slug: "eso-character-id",
  propertySlug: "eso-character-id",
  definition: "the character The Elder Scrolls Online names by this",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
