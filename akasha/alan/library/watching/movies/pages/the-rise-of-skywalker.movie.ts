import type { Movie } from "../movie.page-type.ts"

export const theRiseOfSkywalker = {
  id: "01a06802-6d9a-701d-b0d9-00363490c3a6",
  pageTypeSlug: "movie",
  slug: "the-rise-of-skywalker",
  title: "The Rise of Skywalker",
  partOfSlugs: ["star-wars-2"],
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2019-12-20",
  externalLink: "https://trakt.tv/movies/star-wars-the-rise-of-skywalker-2019",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
