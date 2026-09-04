import type { Movie } from "../movie.page-type.ts"

export const oppenheimer = {
  id: "01a06802-6d99-7025-be00-5d7226cc6135",
  pageTypeSlug: "movie",
  slug: "oppenheimer",
  title: "Oppenheimer",
  partOfSlugs: ["award-winning-movies"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2023-07-21",
  externalLink: "https://trakt.tv/movies/oppenheimer-2023",
  lastSyncedAt: "2025-09-30",
} as const satisfies Movie
