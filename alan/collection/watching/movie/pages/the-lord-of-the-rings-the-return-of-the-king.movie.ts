import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theLordOfTheRingsTheReturnOfTheKing = {
  id: "01a06802-6d9a-7018-a452-3b8fba4d3b5b",
  type: "page-type/movie",
  slug: "the-lord-of-the-rings-the-return-of-the-king",
  title: "The Lord of the Rings: The Return of the King",
  partOfCollections: ["show-collection/the-lord-of-the-rings-shows"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "A",
  publishedAt: "2003-12-17",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/the-lord-of-the-rings-the-return-of-the-king-2003",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.730Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
