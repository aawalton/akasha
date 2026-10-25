import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const heartOfTheHolidays = {
  id: "01a1749a-06bc-7a23-9103-c031d1fdfe89",
  type: "page-type/movie",
  slug: "heart-of-the-holidays",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "756727",
      externalLink: "https://www.themoviedb.org/movie/756727",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Heart of the Holidays",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt13286622",
  posterPath: "/c6gsHd757ghfcZHpR9RjzYz2vBp.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
