import type { Movie } from "../movie.page-type.ts"

export const blackPanther = {
  id: "01a06802-6d98-7018-b2c9-065abccfbdb8",
  pageTypeSlug: "movie",
  slug: "black-panther",
  title: "Black Panther",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 18,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2018-02-16",
  externalLink: "https://trakt.tv/movies/black-panther-2018",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
