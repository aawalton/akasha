import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const royalNewYearSEve = {
  id: "01a17499-c95e-7f6b-bbb7-d52c22c0032b",
  type: "page-type/movie",
  slug: "royal-new-year-s-eve",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-12-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "474979",
      externalLink: "https://www.themoviedb.org/movie/474979",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Royal New Year's Eve",
  genres: ["Romance", "TV Movie", "Comedy", "Drama"],
  imdbId: "tt7654082",
  posterPath: "/rNzJ3GZqT1L3uszZMjqsmzuD3L6.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "VIX ",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
