import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mysteryIslandHouseRules = {
  id: "01a1749a-a94b-7f70-8b29-e5089abcb64d",
  type: "page-type/movie",
  slug: "mystery-island-house-rules",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-island"],
  position: 3,
  publishedAt: "2025-09-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1458530",
      externalLink: "https://www.themoviedb.org/movie/1458530",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery Island: House Rules",
  genres: ["Mystery", "Adventure", "Crime"],
  imdbId: "tt36415198",
  posterPath: "/60ibx0fyvx5gKjN4cqmMA0iwOpB.jpg",
  voteAverage: 7.2,
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
