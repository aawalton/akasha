import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const jeffGoldblum = {
  id: "01a0b7a4-2178-7752-86cc-056727a41e5b",
  type: "page-type/artist",
  slug: "jeff-goldblum",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0O1n2TpXR4XizmHi7aY0l8",
      externalLink: "https://open.spotify.com/artist/0O1n2TpXR4XizmHi7aY0l8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Jeff Goldblum",
} as const satisfies Artist
