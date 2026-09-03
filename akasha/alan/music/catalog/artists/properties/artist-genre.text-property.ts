import type { TextProperty } from "@akasha/pages-system/text-property"

export type ArtistGenre = string

export const artistGenre = {
  id: "01a06243-144b-7010-af12-3f9a28709cb9",
  pageTypeSlug: "text-property",
  slug: "artist-genre",
  propertySlug: "genre",
  definition: "a genre the provider files an artist under",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A genre is the provider's rather than Alan's.",
    },
  ],
} as const satisfies TextProperty
