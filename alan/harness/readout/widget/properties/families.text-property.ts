import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const families = {
  id: "01a05480-1c89-7261-a8c7-0538e7ae019b",
  type: "page-type/text-property",
  slug: "families",
  propertySlug: "families",
  definition: "the tile sizes open to a widget",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
