import type { Season } from "../season.page-type.ts"

export const theExpanseSeason1 = {
  id: "01a06802-b8bf-7009-9026-9d6e5be575d9",
  pageTypeSlug: "season",
  slug: "the-expanse-season-1",
  title: "The Expanse Season 1",
  partOfSlugs: ["the-expanse"],
  position: 1,
  ownLength: 448.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2015-12-15",
  externalId: "trakt-season-83179",
  externalLink: "https://trakt.tv/shows/the-expanse/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
