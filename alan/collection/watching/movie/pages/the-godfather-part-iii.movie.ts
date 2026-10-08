import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theGodfatherPartIii = {
  id: "01a06802-6d9a-700f-9701-75b291a313e1",
  type: "page-type/movie",
  slug: "the-godfather-part-iii",
  title: "The Godfather: Part III",
  partOfCollections: ["show-collection/the-godfather-2"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1990-12-25",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/the-godfather-part-iii-1990",
      lastSyncedAt: "2025-09-30",
    },
  ],
  createdAt: "2026-09-03T16:03:04.730Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
