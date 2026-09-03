import type { Movie } from "../movie.page-type.ts"

export const aquaman = {
  id: "01a06802-6d98-7006-a27f-42e531aae5d1",
  pageTypeSlug: "movie",
  slug: "aquaman",
  title: "Aquaman",
  partOfSlugs: ["dc-extended-universe"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2018-12-21",
  externalLink: "https://trakt.tv/movies/aquaman-2018",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
