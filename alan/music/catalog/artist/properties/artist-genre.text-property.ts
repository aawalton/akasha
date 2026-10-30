import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const artistGenre = {
  id: "01a06243-144b-7010-af12-3f9a28709cb9",
  type: "page-type/text-property",
  slug: "artist-genre",
  propertySlug: "genre",
  definition: "a genre MusicBrainz gives an artist",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A genre is the provider's rather than Alan's.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T13:15:58.411Z",
  updatedAt: "2026-10-30T16:18:08.824Z",
} as const satisfies TextProperty
