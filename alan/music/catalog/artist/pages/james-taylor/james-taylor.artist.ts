import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const jamesTaylor = {
  id: "01a06803-676b-7018-9908-1125e2ef2d1a",
  type: "page-type/artist",
  slug: "james-taylor",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "B",
  status: "following",
  tags: ["Classic Rock"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0vn7UBvSQECKJm2817Yf1P",
      externalLink: "https://open.spotify.com/artist/0vn7UBvSQECKJm2817Yf1P",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "James Taylor",
} as const satisfies Artist
