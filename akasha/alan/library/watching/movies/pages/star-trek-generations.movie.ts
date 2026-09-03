import type { Movie } from "../movie.page-type.ts"

export const starTrekGenerations = {
  id: "01a06802-6d99-703c-b1f0-61f8492ee34b",
  pageTypeSlug: "movie",
  slug: "star-trek-generations",
  title: "Star Trek: Generations",
  partOfSlugs: ["star-trek-3"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1994-11-18",
  externalLink: "https://trakt.tv/movies/star-trek-generations-1994",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
