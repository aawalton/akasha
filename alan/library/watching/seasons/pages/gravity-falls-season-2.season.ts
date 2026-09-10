import type { Season } from "../season.page-type.types.ts"

export const gravityFallsSeason2 = {
  id: "01a06802-b8ba-7021-80ac-5971dab92478",
  pageTypeSlug: "season",
  type: "season",
  slug: "gravity-falls-season-2",
  title: "Gravity Falls Season 2",
  partOfCollections: ["gravity-falls"],
  position: 2,
  ownLength: 471,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2014-08-02",
  externalId: "trakt-season-52098",
  externalLink: "https://trakt.tv/shows/gravity-falls/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
