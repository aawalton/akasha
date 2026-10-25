import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const perfectMatch = {
  id: "01a17499-8948-7cb4-9959-981d63bb0066",
  type: "page-type/movie",
  slug: "perfect-match",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2015-06-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "344123",
      externalLink: "https://www.themoviedb.org/movie/344123",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Perfect Match",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt4526950",
  posterPath: "/sBdSYs5IVVigcoFPImFopbQO9c4.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
