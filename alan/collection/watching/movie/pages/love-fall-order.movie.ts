import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveFallOrder = {
  id: "01a17499-e804-7300-bd5a-5c78d8c50b37",
  type: "page-type/movie",
  slug: "love-fall-order",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "631049",
      externalLink: "https://www.themoviedb.org/movie/631049",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love, Fall & Order",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt10887504",
  posterPath: "/kM8ZCOHDvRE8Qs499w0tfP06t0a.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
