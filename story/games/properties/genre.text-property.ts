import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const genre = {
  id: "01a0673c-8e0e-7005-9075-7892b4954917",
  type: "text-property",
  slug: "genre",
  propertySlug: "genre",
  definition: "a kind of story a game belongs to",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
