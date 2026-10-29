import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const stargateInfinity = {
  id: "01a06802-9332-7038-a82f-1ea307d778f3",
  type: "page-type/show",
  slug: "stargate-infinity",
  title: "Stargate Infinity",
  partOfCollections: ["fandom/stargate-2"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2002-09-14",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/stargate-infinity",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "2580", externalLink: "https://www.themoviedb.org/tv/2580" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:43:28.750Z",
} as const satisfies Show
