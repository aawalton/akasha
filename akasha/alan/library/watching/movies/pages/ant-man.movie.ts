import type { Movie } from "../movie.page-type.ts"

export const antMan = {
  id: "01a06802-6d98-7003-be87-12d8515794a5",
  pageTypeSlug: "movie",
  slug: "ant-man",
  title: "Ant-Man",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2015-07-17",
  externalLink: "https://trakt.tv/movies/ant-man-2015",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
