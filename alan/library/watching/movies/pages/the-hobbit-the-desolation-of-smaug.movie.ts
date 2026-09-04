import type { Movie } from "../movie.page-type.ts"

export const theHobbitTheDesolationOfSmaug = {
  id: "01a06802-6d9a-7013-965c-b432d6e373e9",
  pageTypeSlug: "movie",
  slug: "the-hobbit-the-desolation-of-smaug",
  title: "The Hobbit: The Desolation of Smaug",
  partOfSlugs: ["the-lord-of-the-rings-shows"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2013-12-13",
  externalLink: "https://trakt.tv/movies/the-hobbit-the-desolation-of-smaug-2013",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
