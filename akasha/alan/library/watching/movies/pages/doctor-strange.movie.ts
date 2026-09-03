import type { Movie } from "../movie.page-type.ts"

export const doctorStrange = {
  id: "01a06802-6d99-7003-9f76-cf12992a5882",
  pageTypeSlug: "movie",
  slug: "doctor-strange",
  title: "Doctor Strange",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 14,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2016-11-04",
  externalLink: "https://trakt.tv/movies/doctor-strange-2016",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
