import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const birdsOfPrey = {
  id: "01a06802-6d98-7016-95b1-ce42bddfa537",
  type: "page-type/movie",
  slug: "birds-of-prey",
  title: "Birds of Prey",
  partOfCollections: ["fandom/dc-extended-universe"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-02-07",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/birds-of-prey-2020",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
