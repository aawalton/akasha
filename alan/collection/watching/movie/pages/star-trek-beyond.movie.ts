import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const starTrekBeyond = {
  id: "01a06802-6d99-703a-a4d6-706b317e2763",
  type: "page-type/movie",
  slug: "star-trek-beyond",
  title: "Star Trek Beyond",
  partOfCollections: ["fandom/star-trek-3"],
  position: 19,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2016-07-22",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/star-trek-beyond-2016",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
