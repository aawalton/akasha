import type { Movie } from "../movie.page-type.ts"

export const captainAmericaTheWinterSoldier = {
  id: "01a06802-6d98-701f-af8d-f78433374dd4",
  pageTypeSlug: "movie",
  slug: "captain-america-the-winter-soldier",
  title: "Captain America: The Winter Soldier",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2014-04-04",
  externalLink: "https://trakt.tv/movies/captain-america-the-winter-soldier-2014",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
