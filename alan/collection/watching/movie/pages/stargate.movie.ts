import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const stargate = {
  id: "01a06802-6d9a-7000-afd7-7e8a9474eaec",
  type: "page-type/movie",
  slug: "stargate",
  title: "Stargate",
  partOfCollections: ["fandom/stargate-2"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1994-10-28",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/stargate-1994",
      lastSyncedAt: "2025-10-04",
    },
  ],
  createdAt: "2026-09-03T16:03:04.730Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
