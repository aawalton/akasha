import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const bridalFever = {
  id: "01a17497-3825-75c6-864a-6d84ad8cafeb",
  type: "page-type/movie",
  slug: "bridal-fever",
  ownLength: 88,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2008-02-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "23000",
      externalLink: "https://www.themoviedb.org/movie/23000",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Bridal Fever",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt1111880",
  posterPath: "/fhpQGPZTipBX6rysxkkqPgyvqlt.jpg",
  voteAverage: 5.2,
  streamingOn: ["Cineverse Amazon Channel", "Dove Amazon Channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
