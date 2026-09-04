import type { Movie } from "../movie.page-type.ts"

export const theEmpireStrikesBack = {
  id: "01a06802-6d9a-7009-bb63-9e92fb5e64f7",
  pageTypeSlug: "movie",
  slug: "the-empire-strikes-back",
  title: "The Empire Strikes Back",
  partOfSlugs: ["star-wars-2"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "1980-05-21",
  externalLink: "https://trakt.tv/movies/the-empire-strikes-back-1980",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
