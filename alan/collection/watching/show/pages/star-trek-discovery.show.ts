import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const starTrekDiscovery = {
  id: "01a06802-9332-7028-993e-f437d7ee55bc",
  type: "page-type/show",
  slug: "star-trek-discovery",
  title: "Star Trek: Discovery",
  partOfCollections: ["fandom/star-trek-3"],
  position: 20,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-09-24",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-discovery",
      lastSyncedAt: "2025-10-02",
    },
    { source: "tmdb", externalId: "67198", externalLink: "https://www.themoviedb.org/tv/67198" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Show
