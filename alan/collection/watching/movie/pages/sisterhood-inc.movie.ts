import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sisterhoodInc = {
  id: "01a1749a-a94d-7a72-93d7-5158161b70fb",
  type: "page-type/movie",
  slug: "sisterhood-inc",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2025-02-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1413631",
      externalLink: "https://www.themoviedb.org/movie/1413631",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sisterhood, Inc.",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt34434989",
  posterPath: "/yPk89A68UWxzG3JLcwZNjP8lpss.jpg",
  voteAverage: 5.5,
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
