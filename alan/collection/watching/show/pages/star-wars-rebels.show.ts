import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const starWarsRebels = {
  id: "01a06802-9332-7032-b9a5-0e30a3be811f",
  type: "page-type/show",
  slug: "star-wars-rebels",
  title: "Star Wars Rebels",
  partOfCollections: ["fandom/star-wars-2"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2014-10-03",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-wars-rebels",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "60554", externalLink: "https://www.themoviedb.org/tv/60554" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Show
