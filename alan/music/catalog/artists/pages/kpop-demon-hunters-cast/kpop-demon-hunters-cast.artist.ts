import type { Artist } from "akasha/alan/music/catalog/artists/artist.page-type.types.ts"

export const kpopDemonHuntersCast = {
  id: "01a06803-676b-7021-a8df-cdc6e0bf17a3",
  type: "artist",
  slug: "kpop-demon-hunters-cast",
  title: "KPop Demon Hunters Cast",
  partOfCollections: ["artist-collection/artists", "fandom/kpop-demon-hunters"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  rank: "S",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7mW7Tv7NvywKKXqafZo0Lc",
      externalLink: "https://open.spotify.com/artist/7mW7Tv7NvywKKXqafZo0Lc",
      lastSyncedAt: "2026-03-02",
    },
  ],
} as const satisfies Artist
