import type { Season } from "../season.page-type.ts"

export const theExpanseSeason2 = {
  id: "01a06802-b8bf-700a-8d9b-010dc4580003",
  pageTypeSlug: "season",
  slug: "the-expanse-season-2",
  title: "The Expanse Season 2",
  partOfSlugs: ["the-expanse"],
  position: 2,
  ownLength: 568.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2017-02-02",
  externalId: "trakt-season-123109",
  externalLink: "https://trakt.tv/shows/the-expanse/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
