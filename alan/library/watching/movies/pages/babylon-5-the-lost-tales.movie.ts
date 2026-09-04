import type { Movie } from "../movie.page-type.ts"

export const babylon5TheLostTales = {
  id: "01a06802-6d98-700d-8464-ac18c5e0a070",
  pageTypeSlug: "movie",
  slug: "babylon-5-the-lost-tales",
  title: "Babylon 5: The Lost Tales",
  partOfSlugs: ["babylon-5-2"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2007-07-31",
  externalId: "babylon-5-the-lost-tales-voices-in-the-dark-2007",
  externalLink: "https://trakt.tv/movies/babylon-5-the-lost-tales-voices-in-the-dark-2007",
  lastSyncedAt: "2025-12-20",
} as const satisfies Movie
