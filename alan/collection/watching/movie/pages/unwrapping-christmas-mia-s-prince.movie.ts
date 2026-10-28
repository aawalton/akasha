import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const unwrappingChristmasMiaSPrince = {
  id: "01a1749a-a94e-7109-bd31-b4b8f1d657c8",
  type: "page-type/movie",
  slug: "unwrapping-christmas-mia-s-prince",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/unwrapping-christmas"],
  position: 2,
  publishedAt: "2024-11-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1359243",
      externalLink: "https://www.themoviedb.org/movie/1359243",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Unwrapping Christmas: Mia's Prince",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt34495970",
  posterPath: "/fgiG0Q9IQKP6oGkHL9mDlVLlIUB.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
