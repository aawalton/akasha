import type { Movie } from "../movie.page-type.ts"

export const harryPotterAndTheOrderOfThePhoenix = {
  id: "01a06802-6d99-701a-a1f3-b3fdfdd5bd37",
  pageTypeSlug: "movie",
  slug: "harry-potter-and-the-order-of-the-phoenix",
  title: "Harry Potter and the Order of the Phoenix",
  partOfSlugs: ["harry-potter-movie-series"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2007-07-11",
  externalLink: "https://trakt.tv/movies/harry-potter-and-the-order-of-the-phoenix-2007",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
