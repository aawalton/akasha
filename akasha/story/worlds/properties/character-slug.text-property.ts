import type { TextProperty } from "@akasha/pages-system/text-property"

export type CharacterSlug = string

export const characterSlug = {
  id: "01a063ce-6216-7006-8542-b3d67f43dc56",
  pageTypeSlug: "text-property",
  slug: "character-slug",
  propertySlug: "character-slug",
  definition: "the character a reading reaches",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "No character has a page of its own.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a relation to a character.",
    },
  ],
} as const satisfies TextProperty
