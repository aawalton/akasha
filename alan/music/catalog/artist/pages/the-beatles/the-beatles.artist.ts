import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const theBeatles = {
  id: "01a06803-676c-700c-9dae-14c7db84f5b7",
  type: "page-type/artist",
  slug: "the-beatles",
  title: "The Beatles",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  grade: "D",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3WrFJ7ztbogyGnTHbHJFl2",
      externalLink: "https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2",
      lastSyncedAt: "2025-09-30",
    },
  ],
  tags: ["Classic Rock"],
  createdAt: "2026-09-03T16:04:08.684Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Artist
