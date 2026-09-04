import type { Movie } from "../movie.page-type.ts"

export const eternals = {
  id: "01a06802-6d99-700b-89b6-e4b87dc9ffa7",
  pageTypeSlug: "movie",
  slug: "eternals",
  title: "Eternals",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 26,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2021-11-05",
  externalLink: "https://trakt.tv/movies/eternals-2021",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
