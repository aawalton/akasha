import type { Movie } from "../movie.page-type.ts"

export const starTrekNemesis = {
  id: "01a06802-6d99-7042-b914-166a8fc58ed2",
  pageTypeSlug: "movie",
  slug: "star-trek-nemesis",
  title: "Star Trek: Nemesis",
  partOfSlugs: ["star-trek-3"],
  position: 16,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2002-12-13",
  externalLink: "https://trakt.tv/movies/star-trek-nemesis-2002",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
