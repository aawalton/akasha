import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const coldplay = {
  id: "01a06803-676b-7008-bce3-0dbae6d3edc7",
  type: "page-type/artist",
  slug: "coldplay",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "B",
  status: "following",
  tags: ["Alternative Rock"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4gzpq5DPGxSnKTe4SA8HAU",
      externalLink: "https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Coldplay",
} as const satisfies Artist
