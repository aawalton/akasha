import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const starTrekGenerations = {
  id: "01a06802-6d99-703c-b1f0-61f8492ee34b",
  type: "page-type/movie",
  slug: "star-trek-generations",
  title: "Star Trek: Generations",
  partOfCollections: ["fandom/star-trek-3"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1994-11-18",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/star-trek-generations-1994",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
