import type { Movie } from "../movie.page-type.ts"

export const robinHoodMenInTights = {
  id: "01a06802-6d99-7030-a34d-86f8bdd40529",
  pageTypeSlug: "movie",
  slug: "robin-hood-men-in-tights",
  title: "Robin Hood: Men in Tights",
  partOfSlugs: ["cultural-literacy"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "C",
  publishedAt: "1993-07-28",
  externalLink: "https://trakt.tv/movies/robin-hood-men-in-tights-1993",
  lastSyncedAt: "2025-09-30",
} as const satisfies Movie
