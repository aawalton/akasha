import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theGodfather = {
  id: "01a06802-6d9a-700d-b07c-75977e72b187",
  type: "page-type/movie",
  slug: "the-godfather",
  title: "The Godfather",
  partOfCollections: ["show-collection/the-godfather-2"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1972-03-24",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/the-godfather-1972",
      lastSyncedAt: "2025-09-30",
    },
  ],
  createdAt: "2026-09-03T16:03:04.730Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
