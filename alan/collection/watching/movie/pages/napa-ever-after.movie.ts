import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const napaEverAfter = {
  id: "01a1749a-66bf-7cde-a79f-532e870f4ad2",
  type: "page-type/movie",
  slug: "napa-ever-after",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-08-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1146915",
      externalLink: "https://www.themoviedb.org/movie/1146915",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Napa Ever After",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt28506136",
  posterPath: "/qIZwWGSK2yVqLQdbuIJMd647Onz.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
