import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const angelInTheFamily = {
  id: "01a17497-3824-7190-a6ac-e668c46dbcb9",
  type: "page-type/movie",
  slug: "angel-in-the-family",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2004-12-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "50613",
      externalLink: "https://www.themoviedb.org/movie/50613",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Angel in the Family",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt0403120",
  posterPath: "/sN7K0hKpmafcyVv2x6M6Pp7fK4M.jpg",
  voteAverage: 4.9,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
