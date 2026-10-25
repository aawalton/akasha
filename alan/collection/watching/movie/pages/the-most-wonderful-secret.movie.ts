import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theMostWonderfulSecret = {
  id: "01a1749a-c86b-7b32-a160-f4f9d8194d59",
  type: "page-type/movie",
  slug: "the-most-wonderful-secret",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-11-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773316",
      externalLink: "https://www.themoviedb.org/movie/1773316",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Most Wonderful Secret",
  genres: ["Romance"],
  imdbId: "tt46076602",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
