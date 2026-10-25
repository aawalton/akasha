import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const snowkissed = {
  id: "01a1749a-259d-7bb0-99e8-c1b2f35af4c8",
  type: "page-type/movie",
  slug: "snowkissed",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-01-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "775622",
      externalLink: "https://www.themoviedb.org/movie/775622",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Snowkissed",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt13606148",
  posterPath: "/sIuHSfaYy4LDhOcdW6LNf0EZGzR.jpg",
  voteAverage: 7.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
