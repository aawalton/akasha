import type { Movie } from "../movie.page-type.ts"

export const theFlash = {
  id: "01a06802-6d9a-700b-85a7-4014f03333d0",
  pageTypeSlug: "movie",
  slug: "the-flash",
  title: "The Flash",
  partOfSlugs: ["dc-extended-universe"],
  position: 14,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2023-06-16",
  externalLink: "https://trakt.tv/movies/the-flash-2023",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
