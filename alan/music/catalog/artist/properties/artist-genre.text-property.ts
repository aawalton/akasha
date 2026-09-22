import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const artistGenre = {
  id: "01a06243-144b-7010-af12-3f9a28709cb9",
  type: "page-type/text-property",
  slug: "artist-genre",
  propertySlug: "genre",
  definition: "a genre the provider gives an artist",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A genre is the provider's rather than Alan's.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
