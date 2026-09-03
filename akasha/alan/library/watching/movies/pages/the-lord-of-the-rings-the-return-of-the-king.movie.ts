import type { Movie } from "../movie.page-type.ts"

export const theLordOfTheRingsTheReturnOfTheKing = {
  id: "01a06802-6d9a-7018-a452-3b8fba4d3b5b",
  pageTypeSlug: "movie",
  slug: "the-lord-of-the-rings-the-return-of-the-king",
  title: "The Lord of the Rings: The Return of the King",
  partOfSlugs: ["the-lord-of-the-rings-shows"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "A",
  publishedAt: "2003-12-17",
  externalLink: "https://trakt.tv/movies/the-lord-of-the-rings-the-return-of-the-king-2003",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
