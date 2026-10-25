import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const perfectlyPrudence = {
  id: "01a17499-470e-7656-b361-d945140ca1cb",
  type: "page-type/movie",
  slug: "perfectly-prudence",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/prudence"],
  position: 2,
  publishedAt: "2011-01-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "208364",
      externalLink: "https://www.themoviedb.org/movie/208364",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Perfectly Prudence",
  genres: ["Comedy", "TV Movie"],
  imdbId: "tt1779089",
  posterPath: "/4ShcKrgFwLKMhiDtm7IS1SC4W40.jpg",
  voteAverage: 3.9,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T20:44:55.748Z",
} as const satisfies Movie
