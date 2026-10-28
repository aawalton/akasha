import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const haulOutTheHalloween = {
  id: "01a1749a-a94a-7680-b8ae-21823e316a4f",
  type: "page-type/movie",
  slug: "haul-out-the-halloween",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/haul-out-the-holly"],
  position: 3,
  publishedAt: "2025-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1477448",
      externalLink: "https://www.themoviedb.org/movie/1477448",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Haul Out the Halloween",
  genres: ["Comedy", "TV Movie"],
  imdbId: "tt37211211",
  posterPath: "/jbPRLRliQFZJumIjzuQ6qsODnKm.jpg",
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
