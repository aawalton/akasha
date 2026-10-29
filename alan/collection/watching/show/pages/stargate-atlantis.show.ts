import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const stargateAtlantis = {
  id: "01a06802-9332-7037-a505-e87c5d2c83ab",
  type: "page-type/show",
  slug: "stargate-atlantis",
  title: "Stargate Atlantis",
  partOfCollections: ["fandom/stargate-2"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2004-07-16",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/stargate-atlantis",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "2290", externalLink: "https://www.themoviedb.org/tv/2290" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Show
