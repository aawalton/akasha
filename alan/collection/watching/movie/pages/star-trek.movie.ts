import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const starTrek = {
  id: "01a06802-6d99-7039-9c20-77ef3cc8bc00",
  type: "page-type/movie",
  slug: "star-trek",
  title: "Star Trek",
  partOfCollections: ["fandom/star-trek-3"],
  position: 17,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2009-05-07",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/star-trek-2009",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
