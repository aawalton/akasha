import type { Movie } from "../movie.page-type.types.ts"

export const blackAdam = {
  id: "01a06802-6d98-7017-938c-bdec9e87e6c6",
  pageTypeSlug: "movie",
  type: "movie",
  slug: "black-adam",
  title: "Black Adam",
  partOfCollections: ["dc-extended-universe"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2022-10-21",
  externalLink: "https://trakt.tv/movies/black-adam-2022",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
