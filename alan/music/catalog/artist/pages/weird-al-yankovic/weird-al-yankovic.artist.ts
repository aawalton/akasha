import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const weirdAlYankovic = {
  id: "01a06803-676c-7012-b045-21ef7bb0eb53",
  type: "page-type/artist",
  slug: "weird-al-yankovic",
  title: "“Weird Al” Yankovic",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  grade: "C",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1bDWGdIC2hardyt55nlQgG",
      externalLink: "https://open.spotify.com/artist/1bDWGdIC2hardyt55nlQgG",
      lastSyncedAt: "2025-10-04",
    },
  ],
  tags: ["Satire"],
  createdAt: "2026-09-03T16:04:08.684Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Artist
