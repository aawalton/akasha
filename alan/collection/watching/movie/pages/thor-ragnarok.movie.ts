import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const thorRagnarok = {
  id: "01a06802-6d9a-7025-8362-25495e35bd89",
  type: "page-type/movie",
  slug: "thor-ragnarok",
  title: "Thor: Ragnarok",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 17,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-11-03",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/thor-ragnarok-2017",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.730Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
