import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const robinHoodMenInTights = {
  id: "01a06802-6d99-7030-a34d-86f8bdd40529",
  type: "page-type/movie",
  slug: "robin-hood-men-in-tights",
  title: "Robin Hood: Men in Tights",
  partOfCollections: ["show-collection/cultural-literacy"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "1993-07-28",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/robin-hood-men-in-tights-1993",
      lastSyncedAt: "2025-09-30",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
