import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const kpopDemonHuntersCast = {
  id: "01a06803-676b-7021-a8df-cdc6e0bf17a3",
  type: "page-type/artist",
  slug: "kpop-demon-hunters-cast",
  grade: "S",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists", "fandom/kpop-demon-hunters"],
  position: 0,
  status: "following",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7mW7Tv7NvywKKXqafZo0Lc",
      externalLink: "https://open.spotify.com/artist/7mW7Tv7NvywKKXqafZo0Lc",
      lastSyncedAt: "2026-09-22",
    },
  ],
  title: "KPop Demon Hunters Cast",
} as const satisfies Artist
