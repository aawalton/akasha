import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const findingFatherChristmas = {
  id: "01a17499-a7d4-7a0e-b599-d7011cda5aa5",
  type: "page-type/movie",
  slug: "finding-father-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/father-christmas"],
  position: 0,
  publishedAt: "2016-11-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "421630",
      externalLink: "https://www.themoviedb.org/movie/421630",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Finding Father Christmas",
  genres: ["Drama", "TV Movie", "Romance"],
  imdbId: "tt6245488",
  posterPath: "/wwvfUurOYrV3SI8MXINU6u0Q2qs.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
