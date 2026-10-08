import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const doctorStrange = {
  id: "01a06802-6d99-7003-9f76-cf12992a5882",
  type: "page-type/movie",
  slug: "doctor-strange",
  title: "Doctor Strange",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 14,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-11-04",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/doctor-strange-2016",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
