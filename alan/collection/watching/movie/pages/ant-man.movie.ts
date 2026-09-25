import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const antMan = {
  id: "01a06802-6d98-7003-be87-12d8515794a5",
  type: "page-type/movie",
  slug: "ant-man",
  title: "Ant-Man",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-07-17",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/ant-man-2015",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
