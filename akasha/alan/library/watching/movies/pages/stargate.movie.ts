import type { Movie } from "../movie.page-type.ts"

export const stargate = {
  id: "01a06802-6d9a-7000-afd7-7e8a9474eaec",
  pageTypeSlug: "movie",
  slug: "stargate",
  title: "Stargate",
  partOfSlugs: ["stargate-2"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1994-10-28",
  externalLink: "https://trakt.tv/movies/stargate-1994",
  lastSyncedAt: "2025-10-04",
} as const satisfies Movie
