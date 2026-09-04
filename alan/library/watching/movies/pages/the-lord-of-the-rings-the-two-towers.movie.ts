import type { Movie } from "../movie.page-type.ts"

export const theLordOfTheRingsTheTwoTowers = {
  id: "01a06802-6d9a-7019-8a1d-2f99b19056bb",
  pageTypeSlug: "movie",
  slug: "the-lord-of-the-rings-the-two-towers",
  title: "The Lord of the Rings: The Two Towers",
  partOfSlugs: ["the-lord-of-the-rings-shows"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "A",
  publishedAt: "2002-12-18",
  externalLink: "https://trakt.tv/movies/the-lord-of-the-rings-the-two-towers-2002",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
