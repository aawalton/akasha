import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const celticWoman = {
  id: "01a06803-676b-7005-a078-1595cfcab4e9",
  type: "artist",
  slug: "celtic-woman",
  title: "Celtic Woman",
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
      externalId: "6NWtt9pNOL2Gx7kBykdE5x",
      externalLink: "https://open.spotify.com/artist/6NWtt9pNOL2Gx7kBykdE5x",
      lastSyncedAt: "2026-02-23",
    },
  ],
  tags: ["Celtic"],
} as const satisfies Artist
