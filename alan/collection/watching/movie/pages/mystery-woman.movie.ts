import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mysteryWoman = {
  id: "01a17497-382a-7c87-9844-62505a597fb1",
  type: "page-type/movie",
  slug: "mystery-woman",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-woman"],
  position: 1,
  publishedAt: "2003-08-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "207454",
      externalLink: "https://www.themoviedb.org/movie/207454",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery Woman",
  genres: ["Mystery", "Crime", "Thriller", "TV Movie"],
  imdbId: "tt0370987",
  posterPath: "/7crZ2mg1cIezYaLVMsqEOD3BIdD.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T20:44:53.349Z",
} as const satisfies Movie
