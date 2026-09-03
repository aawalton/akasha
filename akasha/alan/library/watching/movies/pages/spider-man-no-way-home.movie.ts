import type { Movie } from "../movie.page-type.ts"

export const spiderManNoWayHome = {
  id: "01a06802-6d99-7038-baa4-68d0f1d23004",
  pageTypeSlug: "movie",
  slug: "spider-man-no-way-home",
  title: "Spider-Man: No Way Home",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 27,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2021-12-17",
  externalLink: "https://trakt.tv/movies/spider-man-no-way-home-2021",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
