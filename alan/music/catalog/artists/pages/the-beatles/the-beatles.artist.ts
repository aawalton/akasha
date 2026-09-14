import type { Artist } from "akasha/alan/music/catalog/artists/artist.page-type.types.ts"

export const theBeatles = {
  id: "01a06803-676c-700c-9dae-14c7db84f5b7",
  type: "artist",
  slug: "the-beatles",
  title: "The Beatles",
  partOfCollections: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  rank: "D",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3WrFJ7ztbogyGnTHbHJFl2",
      externalLink: "https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2",
      lastSyncedAt: "2025-09-30",
    },
  ],
  tags: ["Classic Rock"],
} as const satisfies Artist
