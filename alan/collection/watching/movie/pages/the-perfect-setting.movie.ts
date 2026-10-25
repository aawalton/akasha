import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const thePerfectSetting = {
  id: "01a1749a-a94d-7f76-aa8c-e37424ec5862",
  type: "page-type/movie",
  slug: "the-perfect-setting",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2025-01-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1396981",
      externalLink: "https://www.themoviedb.org/movie/1396981",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Perfect Setting",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt34783302",
  posterPath: "/lgB3PdIywY6O0jqku4w67TtExpz.jpg",
  voteAverage: 7.625,
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
