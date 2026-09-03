import type { Movie } from "../movie.page-type.ts"

export const barbie = {
  id: "01a06802-6d98-700f-9c28-4201cb5539e6",
  pageTypeSlug: "movie",
  slug: "barbie",
  title: "Barbie",
  partOfSlugs: ["award-winning-movies"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2023-07-21",
  externalLink: "https://trakt.tv/movies/barbie-2023",
  lastSyncedAt: "2025-09-30",
} as const satisfies Movie
