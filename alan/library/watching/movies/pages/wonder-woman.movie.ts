import type { Movie } from "../movie.page-type.ts"

export const wonderWoman = {
  id: "01a06802-6d9a-702b-8808-130bc01891b4",
  pageTypeSlug: "movie",
  type: "movie",
  slug: "wonder-woman",
  title: "Wonder Woman",
  partOfCollections: ["dc-extended-universe"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2017-06-02",
  externalLink: "https://trakt.tv/movies/wonder-woman-2017",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
