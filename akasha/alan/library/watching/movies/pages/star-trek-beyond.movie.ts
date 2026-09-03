import type { Movie } from "../movie.page-type.ts"

export const starTrekBeyond = {
  id: "01a06802-6d99-703a-a4d6-706b317e2763",
  pageTypeSlug: "movie",
  slug: "star-trek-beyond",
  title: "Star Trek Beyond",
  partOfSlugs: ["star-trek-3"],
  position: 19,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2016-07-22",
  externalLink: "https://trakt.tv/movies/star-trek-beyond-2016",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
