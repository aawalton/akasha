import type { Movie } from "../movie.page-type.ts"

export const ironMan2 = {
  id: "01a06802-6d99-701f-9814-e6b1143443ff",
  pageTypeSlug: "movie",
  slug: "iron-man-2",
  title: "Iron Man 2",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2010-05-07",
  externalLink: "https://trakt.tv/movies/iron-man-2-2010",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
