import type { Movie } from "../movie.page-type.ts"

export const starTrekVTheFinalFrontier = {
  id: "01a06802-6d99-7045-ac77-f3c08b3f340a",
  pageTypeSlug: "movie",
  slug: "star-trek-v-the-final-frontier",
  title: "Star Trek V: The Final Frontier",
  partOfSlugs: ["star-trek-3"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1989-06-09",
  externalLink: "https://trakt.tv/movies/star-trek-v-the-final-frontier-1989",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
