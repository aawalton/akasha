import type { TextProperty } from "@akasha/pages-system/text-property"

export type Genre = string

export const genre = {
  id: "01a0673c-8e0e-7005-9075-7892b4954917",
  pageTypeSlug: "text-property",
  slug: "genre",
  propertySlug: "genre",
  definition: "a kind of story a game belongs to",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
