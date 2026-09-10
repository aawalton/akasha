import type { List } from "@akasha/pages/page-property"
import type { TextProperty } from "@akasha/pages/text-property"

export type Genre = List<string>

export const genre = {
  id: "01a0673c-8e0e-7005-9075-7892b4954917",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "genre",
  propertySlug: "genre",
  definition: "a kind of story a game belongs to",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
