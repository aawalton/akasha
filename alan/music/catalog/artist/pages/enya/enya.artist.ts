import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const enya = {
  id: "01a06803-676b-700e-b5dc-e19c81a95c3b",
  type: "artist",
  slug: "enya",
  title: "Enya",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  rank: "A",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6uothxMWeLWIhsGeF7cyo4",
      externalLink: "https://open.spotify.com/artist/6uothxMWeLWIhsGeF7cyo4",
      lastSyncedAt: "2026-02-14",
    },
  ],
  tags: ["Celtic"],
} as const satisfies Artist
