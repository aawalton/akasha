import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const anAlpineHoliday = {
  id: "01a1749a-a949-715f-82f5-0ac379395f0d",
  type: "page-type/movie",
  slug: "an-alpine-holiday",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1547921",
      externalLink: "https://www.themoviedb.org/movie/1547921",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "An Alpine Holiday",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt36836189",
  posterPath: "/8XASNGI9cBdlEO2aWGiSd68wbWT.jpg",
  voteAverage: 6.9,
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
