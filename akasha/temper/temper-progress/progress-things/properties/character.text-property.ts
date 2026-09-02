import type { TextProperty } from "@akasha/pages-system/text-property"

export type Character = string

export const character = {
  id: "01a05fc6-81fb-7d2b-9860-e72705b8dd8f",
  pageTypeSlug: "text-property",
  slug: "character",
  propertySlug: "character",
  definition: "the character a page is about",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [{ invariantKind: "gap", statement: "This property is a relation to a character." }],
} as const satisfies TextProperty
