import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sleighBellsRing = {
  id: "01a17499-a7d7-7d44-8529-1e858fd9b151",
  type: "page-type/movie",
  slug: "sleigh-bells-ring",
  ownLength: 82,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-12-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "421626",
      externalLink: "https://www.themoviedb.org/movie/421626",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sleigh Bells Ring",
  genres: ["TV Movie", "Romance", "Family"],
  imdbId: "tt6349282",
  posterPath: "/60yNcrGKymskuN9OcO4BeNNn3q0.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
