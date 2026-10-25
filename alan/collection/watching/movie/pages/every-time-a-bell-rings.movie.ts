import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const everyTimeABellRings = {
  id: "01a1749a-464a-7a84-9cf6-5a31e405b2bd",
  type: "page-type/movie",
  slug: "every-time-a-bell-rings",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874239",
      externalLink: "https://www.themoviedb.org/movie/874239",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Every Time a Bell Rings",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt15943414",
  posterPath: "/oONJjxMXeWJehLYR6m35POcxjuv.jpg",
  voteAverage: 5.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
