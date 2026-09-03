import type { Movie } from "../movie.page-type.ts"

export const ironMan = {
  id: "01a06802-6d99-701e-8b66-b530336fc1b0",
  pageTypeSlug: "movie",
  slug: "iron-man",
  title: "Iron Man",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2008-05-02",
  externalLink: "https://trakt.tv/movies/iron-man-2008",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
