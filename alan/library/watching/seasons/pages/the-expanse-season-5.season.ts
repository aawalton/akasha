import type { Season } from "../season.page-type.ts"

export const theExpanseSeason5 = {
  id: "01a06802-b8bf-700d-bf0f-dde8581f050c",
  pageTypeSlug: "season",
  slug: "the-expanse-season-5",
  title: "The Expanse Season 5",
  partOfSlugs: ["the-expanse"],
  position: 5,
  ownLength: 525,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2020-12-17",
  externalId: "trakt-season-230724",
  externalLink: "https://trakt.tv/shows/the-expanse/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
