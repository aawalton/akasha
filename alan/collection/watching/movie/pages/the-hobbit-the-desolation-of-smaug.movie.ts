import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theHobbitTheDesolationOfSmaug = {
  id: "01a06802-6d9a-7013-965c-b432d6e373e9",
  type: "page-type/movie",
  slug: "the-hobbit-the-desolation-of-smaug",
  title: "The Hobbit: The Desolation of Smaug",
  partOfCollections: ["show-collection/the-lord-of-the-rings-shows"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2013-12-13",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/the-hobbit-the-desolation-of-smaug-2013",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.730Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
