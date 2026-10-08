import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const avengersInfinityWar = {
  id: "01a06802-6d98-700b-bda0-f62e07bf230a",
  type: "page-type/movie",
  slug: "avengers-infinity-war",
  title: "Avengers: Infinity War",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 19,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-04-27",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/avengers-infinity-war-2018",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.728Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
