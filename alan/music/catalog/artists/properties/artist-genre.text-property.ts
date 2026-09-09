import type { TextProperty } from "@akasha/pages/text-property"

export type ArtistGenre = string

export const artistGenre = {
  id: "01a06243-144b-7010-af12-3f9a28709cb9",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "artist-genre",
  propertySlug: "genre",
  definition: "a genre the provider files an artist under",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A genre is the provider's rather than Alan's.",
    },
  ],
} as const satisfies TextProperty
