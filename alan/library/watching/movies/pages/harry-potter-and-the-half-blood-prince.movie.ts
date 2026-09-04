import type { Movie } from "../movie.page-type.ts"

export const harryPotterAndTheHalfBloodPrince = {
  id: "01a06802-6d99-7019-937a-77cfb12138da",
  pageTypeSlug: "movie",
  slug: "harry-potter-and-the-half-blood-prince",
  title: "Harry Potter and the Half-Blood Prince",
  partOfSlugs: ["harry-potter-movie-series"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2009-07-15",
  externalLink: "https://trakt.tv/movies/harry-potter-and-the-half-blood-prince-2009",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
