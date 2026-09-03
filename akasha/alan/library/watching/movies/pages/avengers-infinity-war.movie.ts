import type { Movie } from "../movie.page-type.ts"

export const avengersInfinityWar = {
  id: "01a06802-6d98-700b-bda0-f62e07bf230a",
  pageTypeSlug: "movie",
  slug: "avengers-infinity-war",
  title: "Avengers: Infinity War",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 19,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2018-04-27",
  externalLink: "https://trakt.tv/movies/avengers-infinity-war-2018",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
