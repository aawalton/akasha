import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aGrandBiltmoreChristmas = {
  id: "01a1749a-c867-7919-900e-df3ad70288ee",
  type: "page-type/movie",
  slug: "a-grand-biltmore-christmas",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["franchise/a-biltmore-christmas"],
  position: 2,
  publishedAt: "2026-12-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1602653",
      externalLink: "https://www.themoviedb.org/movie/1602653",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Grand Biltmore Christmas",
  genres: ["Romance", "Fantasy", "TV Movie"],
  imdbId: "tt39380754",
  posterPath: "/8YnUZpsKKpMxY95jOzxwE09cXRD.jpg",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T20:45:31.132Z",
} as const satisfies Movie
