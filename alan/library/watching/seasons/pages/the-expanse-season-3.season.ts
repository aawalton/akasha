import type { Season } from "../season.page-type.ts"

export const theExpanseSeason3 = {
  id: "01a06802-b8bf-700b-ad42-8c4baadd6bf1",
  pageTypeSlug: "season",
  slug: "the-expanse-season-3",
  title: "The Expanse Season 3",
  partOfSlugs: ["the-expanse"],
  position: 3,
  ownLength: 574.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2018-04-11",
  externalId: "trakt-season-152369",
  externalLink: "https://trakt.tv/shows/the-expanse/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
