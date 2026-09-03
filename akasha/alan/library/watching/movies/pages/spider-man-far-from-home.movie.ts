import type { Movie } from "../movie.page-type.ts"

export const spiderManFarFromHome = {
  id: "01a06802-6d99-7036-af62-3f5f6d44255b",
  pageTypeSlug: "movie",
  slug: "spider-man-far-from-home",
  title: "Spider-Man: Far From Home",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 23,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2019-07-02",
  externalLink: "https://trakt.tv/movies/spider-man-far-from-home-2019",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
