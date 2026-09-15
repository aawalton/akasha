import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const coldplay = {
  id: "01a06803-676b-7008-bce3-0dbae6d3edc7",
  type: "page-type/artist",
  slug: "coldplay",
  title: "Coldplay",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  rank: "B",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4gzpq5DPGxSnKTe4SA8HAU",
      externalLink: "https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU",
      lastSyncedAt: "2026-03-02",
    },
  ],
  tags: ["Alternative Rock"],
} as const satisfies Artist
