import type { Movie } from "../movie.page-type.ts"

export const birdsOfPrey = {
  id: "01a06802-6d98-7016-95b1-ce42bddfa537",
  pageTypeSlug: "movie",
  slug: "birds-of-prey",
  title: "Birds of Prey",
  partOfSlugs: ["dc-extended-universe"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2020-02-07",
  externalLink: "https://trakt.tv/movies/birds-of-prey-2020",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
