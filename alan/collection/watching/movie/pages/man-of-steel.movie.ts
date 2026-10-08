import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const manOfSteel = {
  id: "01a06802-6d99-7024-84d1-c5212876b772",
  type: "page-type/movie",
  slug: "man-of-steel",
  title: "Man of Steel",
  partOfCollections: ["fandom/dc-extended-universe"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2013-06-14",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/man-of-steel-2013",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
