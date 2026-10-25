import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theReluctantRoyal = {
  id: "01a1749a-a94d-7359-a9aa-5fc6abc38cc4",
  type: "page-type/movie",
  slug: "the-reluctant-royal",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2025-03-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1418290",
      externalLink: "https://www.themoviedb.org/movie/1418290",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Reluctant Royal",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt35558993",
  posterPath: "/A0IOjMS9hLsmL32vDrUL9bNuWze.jpg",
  voteAverage: 6.79,
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
