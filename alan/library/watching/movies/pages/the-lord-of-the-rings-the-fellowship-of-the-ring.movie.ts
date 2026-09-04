import type { Movie } from "../movie.page-type.ts"

export const theLordOfTheRingsTheFellowshipOfTheRing = {
  id: "01a06802-6d9a-7017-a755-69fbe41ecbc7",
  pageTypeSlug: "movie",
  slug: "the-lord-of-the-rings-the-fellowship-of-the-ring",
  title: "The Lord of the Rings: The Fellowship of the Ring",
  partOfSlugs: ["the-lord-of-the-rings-shows"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "A",
  publishedAt: "2001-12-19",
  externalLink: "https://trakt.tv/movies/the-lord-of-the-rings-the-fellowship-of-the-ring-2001",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
