import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const starWarsTheBadBatch = {
  id: "01a06802-9332-7035-bff6-868562b45cd1",
  type: "page-type/show",
  slug: "star-wars-the-bad-batch",
  title: "Star Wars: The Bad Batch",
  partOfCollections: ["fandom/star-wars-2"],
  position: 17,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-05-04",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-wars-the-bad-batch",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "105971", externalLink: "https://www.themoviedb.org/tv/105971" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:42:57.028Z",
} as const satisfies Show
