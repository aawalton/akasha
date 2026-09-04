import type { Movie } from "../movie.page-type.ts"

export const starTrek = {
  id: "01a06802-6d99-7039-9c20-77ef3cc8bc00",
  pageTypeSlug: "movie",
  slug: "star-trek",
  title: "Star Trek",
  partOfSlugs: ["star-trek-3"],
  position: 17,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2009-05-07",
  externalLink: "https://trakt.tv/movies/star-trek-2009",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
