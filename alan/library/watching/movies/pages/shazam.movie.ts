import type { Movie } from "../movie.page-type.ts"

export const shazam = {
  id: "01a06802-6d99-7033-844f-7092afd3efd3",
  pageTypeSlug: "movie",
  slug: "shazam",
  title: "Shazam!",
  partOfSlugs: ["dc-extended-universe"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2019-04-05",
  externalLink: "https://trakt.tv/movies/shazam-2019",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
