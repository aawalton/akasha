import type { Season } from "../season.page-type.ts"

export const gravityFallsSeason1 = {
  id: "01a06802-b8ba-7020-a2d6-69249d6b6f79",
  pageTypeSlug: "season",
  slug: "gravity-falls-season-1",
  title: "Gravity Falls Season 1",
  partOfSlugs: ["gravity-falls"],
  position: 1,
  ownLength: 471,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2012-06-16",
  externalId: "trakt-season-52097",
  externalLink: "https://trakt.tv/shows/gravity-falls/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
