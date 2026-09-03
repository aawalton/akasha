import type { Movie } from "../movie.page-type.ts"

export const deadpoolAndWolverine = {
  id: "01a06802-6d99-7002-b74c-ffbabe0ef2c8",
  pageTypeSlug: "movie",
  slug: "deadpool-and-wolverine",
  title: "Deadpool & Wolverine",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 50,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2024-07-26",
  externalLink: "https://trakt.tv/movies/deadpool-wolverine-2024",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
