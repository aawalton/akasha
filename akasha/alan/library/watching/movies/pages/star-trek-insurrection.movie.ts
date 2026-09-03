import type { Movie } from "../movie.page-type.ts"

export const starTrekInsurrection = {
  id: "01a06802-6d99-703f-9f72-53390b9e87cc",
  pageTypeSlug: "movie",
  slug: "star-trek-insurrection",
  title: "Star Trek: Insurrection",
  partOfSlugs: ["star-trek-3"],
  position: 14,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1998-12-11",
  externalLink: "https://trakt.tv/movies/star-trek-insurrection-1998",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
