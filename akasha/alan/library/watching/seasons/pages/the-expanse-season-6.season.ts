import type { Season } from "../season.page-type.ts"

export const theExpanseSeason6 = {
  id: "01a06802-b8bf-700e-80eb-219b274a740b",
  pageTypeSlug: "season",
  slug: "the-expanse-season-6",
  title: "The Expanse Season 6",
  partOfSlugs: ["the-expanse"],
  position: 6,
  ownLength: 291,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2021-12-10",
  externalId: "trakt-season-276002",
  externalLink: "https://trakt.tv/shows/the-expanse/seasons/6",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
