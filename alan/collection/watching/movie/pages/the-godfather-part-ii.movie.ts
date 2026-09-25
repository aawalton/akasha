import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theGodfatherPartIi = {
  id: "01a06802-6d9a-700e-82e4-f44b26acc772",
  type: "page-type/movie",
  slug: "the-godfather-part-ii",
  title: "The Godfather: Part II",
  partOfCollections: ["show-collection/the-godfather-2"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1974-12-20",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/the-godfather-part-ii-1974",
      lastSyncedAt: "2025-09-30",
    },
  ],
} as const satisfies Movie
