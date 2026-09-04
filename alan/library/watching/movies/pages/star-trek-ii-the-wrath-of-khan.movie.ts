import type { Movie } from "../movie.page-type.ts"

export const starTrekIiTheWrathOfKhan = {
  id: "01a06802-6d99-703d-9683-8531becaff54",
  pageTypeSlug: "movie",
  slug: "star-trek-ii-the-wrath-of-khan",
  title: "Star Trek II: The Wrath of Khan",
  partOfSlugs: ["star-trek-3"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "C",
  publishedAt: "1982-06-04",
  externalLink: "https://trakt.tv/movies/star-trek-ii-the-wrath-of-khan-1982",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
