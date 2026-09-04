import type { Movie } from "../movie.page-type.ts"

export const dunePartOne = {
  id: "01a06802-6d99-7007-9305-738b4198c7a1",
  pageTypeSlug: "movie",
  slug: "dune-part-one",
  title: "Dune: Part One",
  partOfSlugs: ["dune-2"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2021-10-21",
  externalLink: "https://trakt.tv/movies/dune-2021",
  lastSyncedAt: "2025-09-30",
} as const satisfies Movie
