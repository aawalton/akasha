import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const alexWarren = {
  id: "01a06803-676a-7001-a64d-3043430e68d6",
  type: "page-type/artist",
  slug: "alex-warren",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  grade: "A",
  status: "following",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0fTSzq9jAh4c36UVb4V7CB",
      externalLink: "https://open.spotify.com/artist/0fTSzq9jAh4c36UVb4V7CB",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Alex Warren",
} as const satisfies Artist
