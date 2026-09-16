import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const celticWoman = {
  id: "01a06803-676b-7005-a078-1595cfcab4e9",
  type: "page-type/artist",
  slug: "celtic-woman",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "B",
  status: "following",
  tags: ["Celtic"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6NWtt9pNOL2Gx7kBykdE5x",
      externalLink: "https://open.spotify.com/artist/6NWtt9pNOL2Gx7kBykdE5x",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Celtic Woman",
} as const satisfies Artist
