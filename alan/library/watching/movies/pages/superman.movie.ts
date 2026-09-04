import type { Movie } from "../movie.page-type.ts"

export const superman = {
  id: "01a06802-6d9a-7004-85fd-141fdbb35523",
  pageTypeSlug: "movie",
  slug: "superman",
  title: "Superman",
  partOfSlugs: ["dc-universe"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2025-07-11",
  externalLink: "https://trakt.tv/movies/superman-2025",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
