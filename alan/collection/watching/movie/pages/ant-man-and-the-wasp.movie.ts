import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const antManAndTheWasp = {
  id: "01a06802-6d98-7004-bae3-4d930222318a",
  type: "page-type/movie",
  slug: "ant-man-and-the-wasp",
  title: "Ant-Man and the Wasp",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 20,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-07-06",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/ant-man-and-the-wasp-2018",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.728Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
