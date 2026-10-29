import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const stargateSg1 = {
  id: "01a06802-9332-703a-ae25-02697925f8e3",
  type: "page-type/show",
  slug: "stargate-sg-1",
  title: "Stargate SG-1",
  partOfCollections: ["fandom/stargate-2"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1997-07-28",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/stargate-sg-1",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "4629", externalLink: "https://www.themoviedb.org/tv/4629" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:43:51.281Z",
} as const satisfies Show
