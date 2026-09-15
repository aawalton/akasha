import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const enya = {
  id: "01a06803-676b-700e-b5dc-e19c81a95c3b",
  type: "artist",
  slug: "enya",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "A",
  status: "following",
  tags: ["Celtic"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6uothxMWeLWIhsGeF7cyo4",
      externalLink: "https://open.spotify.com/artist/6uothxMWeLWIhsGeF7cyo4",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Enya",
} as const satisfies Artist
