import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const doubleScoop = {
  id: "01a1749a-a94a-739e-9d0c-66dd367d8a81",
  type: "page-type/movie",
  slug: "double-scoop",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2025-08-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1490891",
      externalLink: "https://www.themoviedb.org/movie/1490891",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Double Scoop",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt36940073",
  posterPath: "/4EZs82A1m7xSxClRTwI8JbezAnK.jpg",
  voteAverage: 7.538,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
