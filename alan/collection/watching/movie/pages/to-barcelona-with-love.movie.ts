import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const toBarcelonaWithLove = {
  id: "01a1749a-a94e-7c64-9152-1f8a2fdb75a8",
  type: "page-type/movie",
  slug: "to-barcelona-with-love",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["franchise/to-barcelona"],
  position: 0,
  publishedAt: "2025-06-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1474447",
      externalLink: "https://www.themoviedb.org/movie/1474447",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "To Barcelona, with Love",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt35775356",
  posterPath: "/xuQEKOhq7QfaJNZA5tA1nNqVeUy.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
