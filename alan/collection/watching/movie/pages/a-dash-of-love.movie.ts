import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aDashOfLove = {
  id: "01a17499-a7d2-7e71-b6c5-5770ca83ebb0",
  type: "page-type/movie",
  slug: "a-dash-of-love",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-02-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "437515",
      externalLink: "https://www.themoviedb.org/movie/437515",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Dash of Love",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt6286216",
  posterPath: "/rBuQPAO9RZmtrycr1n7ZI8ObsiH.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
