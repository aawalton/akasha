import type { Movie } from "../movie.page-type.ts"

export const fantasticBeastsAndWhereToFindThem = {
  id: "01a06802-6d99-700c-a344-55c632c48af2",
  pageTypeSlug: "movie",
  slug: "fantastic-beasts-and-where-to-find-them",
  title: "Fantastic Beasts and Where to Find Them",
  partOfSlugs: ["fantastic-beasts-movie-series"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2016-11-18",
  externalLink: "https://trakt.tv/movies/fantastic-beasts-and-where-to-find-them-2016",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
