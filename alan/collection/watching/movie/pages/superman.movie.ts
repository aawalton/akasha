import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const superman = {
  id: "01a06802-6d9a-7004-85fd-141fdbb35523",
  type: "page-type/movie",
  slug: "superman",
  title: "Superman",
  partOfCollections: ["fandom/dc-universe"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-07-11",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/superman-2025",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.730Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
