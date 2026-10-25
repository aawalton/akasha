import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const a90sChristmas = {
  id: "01a1749a-89a5-794a-926f-ed056e446881",
  type: "page-type/movie",
  slug: "a-90s-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1361210",
      externalLink: "https://www.themoviedb.org/movie/1361210",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A ’90s Christmas",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt16270280",
  posterPath: "/eUX70TC2xgEMz8uCoYVZeukxtZA.jpg",
  voteAverage: 6.69,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
