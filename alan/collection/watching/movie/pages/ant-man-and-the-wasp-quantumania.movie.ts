import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const antManAndTheWaspQuantumania = {
  id: "01a06802-6d98-7005-a37f-777f5cf5e2d8",
  type: "page-type/movie",
  slug: "ant-man-and-the-wasp-quantumania",
  title: "Ant-Man and the Wasp: Quantumania",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 41,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-02-17",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/ant-man-and-the-wasp-quantumania-2023",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
