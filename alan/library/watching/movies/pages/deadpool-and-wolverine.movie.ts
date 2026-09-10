import type { Movie } from "../movie.page-type.types.ts"

export const deadpoolAndWolverine = {
  id: "01a06802-6d99-7002-b74c-ffbabe0ef2c8",
  pageTypeSlug: "movie",
  type: "movie",
  slug: "deadpool-and-wolverine",
  title: "Deadpool & Wolverine",
  partOfCollections: ["marvel-cinematic-universe"],
  position: 50,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2024-07-26",
  externalLink: "https://trakt.tv/movies/deadpool-wolverine-2024",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
