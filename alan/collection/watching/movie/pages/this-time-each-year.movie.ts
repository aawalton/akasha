import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const thisTimeEachYear = {
  id: "01a1749a-a94e-7dd6-aee1-3ac6de070edf",
  type: "page-type/movie",
  slug: "this-time-each-year",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-10-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1360772",
      externalLink: "https://www.themoviedb.org/movie/1360772",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "This Time Each Year",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt33503189",
  posterPath: "/tWlWtBynAmm68Sh2rwydMM384eU.jpg",
  voteAverage: 6.3,
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
