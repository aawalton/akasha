import type { Movie } from "../movie.page-type.ts"

export const captainAmericaCivilWar = {
  id: "01a06802-6d98-701d-a02a-5eafbb8df036",
  pageTypeSlug: "movie",
  slug: "captain-america-civil-war",
  title: "Captain America: Civil War",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2016-05-06",
  externalLink: "https://trakt.tv/movies/captain-america-civil-war-2016",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
