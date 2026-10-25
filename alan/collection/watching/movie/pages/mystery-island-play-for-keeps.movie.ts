import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mysteryIslandPlayForKeeps = {
  id: "01a1749a-a94c-79c8-80be-b8ca5bbfa3b0",
  type: "page-type/movie",
  slug: "mystery-island-play-for-keeps",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-island"],
  position: 3,
  publishedAt: "2025-08-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1458454",
      externalLink: "https://www.themoviedb.org/movie/1458454",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery Island: Play for Keeps",
  genres: ["Mystery", "Adventure", "TV Movie"],
  imdbId: "tt36415104",
  posterPath: "/xynf6bJILTN3UzLRBbKAklVf056.jpg",
  voteAverage: 7.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T20:45:28.240Z",
} as const satisfies Movie
