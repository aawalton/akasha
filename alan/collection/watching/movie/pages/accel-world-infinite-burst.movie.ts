import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const accelWorldInfiniteBurst = {
  id: "01a06802-6d98-7001-a153-516c48badd59",
  type: "page-type/movie",
  slug: "accel-world-infinite-burst",
  title: "Accel World: Infinite Burst",
  partOfCollections: ["fandom/accel-world"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2016-07-23",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "accel-world-infinite-burst-2016",
      externalLink: "https://trakt.tv/movies/accel-world-infinite-burst-2016",
      lastSyncedAt: "2025-10-13",
    },
  ],
} as const satisfies Movie
