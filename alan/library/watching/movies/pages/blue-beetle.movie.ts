import type { Movie } from "../movie.page-type.ts"

export const blueBeetle = {
  id: "01a06802-6d98-701b-93ae-a8fe3f83ab91",
  pageTypeSlug: "movie",
  slug: "blue-beetle",
  title: "Blue Beetle",
  partOfSlugs: ["dc-extended-universe"],
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2023-08-18",
  externalLink: "https://trakt.tv/movies/blue-beetle-2023",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
