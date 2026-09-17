import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const jisoo = {
  id: "01a06803-676b-701c-b06a-7f4bf3c6d543",
  type: "page-type/artist",
  slug: "jisoo",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "B",
  status: "following",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6UZ0ba50XreR4TM8u322gs",
      externalLink: "https://open.spotify.com/artist/6UZ0ba50XreR4TM8u322gs",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "JISOO",
} as const satisfies Artist
