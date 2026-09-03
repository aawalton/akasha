import type { Movie } from "../movie.page-type.ts"

export const theGodfather = {
  id: "01a06802-6d9a-700d-b07c-75977e72b187",
  pageTypeSlug: "movie",
  slug: "the-godfather",
  title: "The Godfather",
  partOfSlugs: ["the-godfather-2"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1972-03-24",
  externalLink: "https://trakt.tv/movies/the-godfather-1972",
  lastSyncedAt: "2025-09-30",
} as const satisfies Movie
