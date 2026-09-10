import type { Movie } from "../movie.page-type.types.ts"

export const superman = {
  id: "01a06802-6d9a-7004-85fd-141fdbb35523",
  pageTypeSlug: "movie",
  type: "movie",
  slug: "superman",
  title: "Superman",
  partOfCollections: ["dc-universe"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "completed",
  publishedAt: "2025-07-11",
  externalLink: "https://trakt.tv/movies/superman-2025",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
