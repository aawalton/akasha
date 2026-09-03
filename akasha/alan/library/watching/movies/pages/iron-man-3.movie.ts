import type { Movie } from "../movie.page-type.ts"

export const ironMan3 = {
  id: "01a06802-6d99-7020-8aaa-2b641730111f",
  pageTypeSlug: "movie",
  slug: "iron-man-3",
  title: "Iron Man 3",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2013-05-03",
  externalLink: "https://trakt.tv/movies/iron-man-3-2013",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
