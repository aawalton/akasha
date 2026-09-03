import type { Movie } from "../movie.page-type.ts"

export const harryPotterAndThePhilosopherSStone = {
  id: "01a06802-6d99-701b-bdb4-6f265e1776ba",
  pageTypeSlug: "movie",
  slug: "harry-potter-and-the-philosopher-s-stone",
  title: "Harry Potter and the Philosopher's Stone",
  partOfSlugs: ["harry-potter-movie-series"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2001-11-16",
  externalLink: "https://trakt.tv/movies/harry-potter-and-the-philosopher-s-stone-2001",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
