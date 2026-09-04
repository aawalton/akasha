import type { Season } from "../season.page-type.ts"

export const parksAndRecreationSeason5 = {
  id: "01a06802-b8bc-700b-be48-3acfcdc8ef60",
  pageTypeSlug: "season",
  slug: "parks-and-recreation-season-5",
  title: "Parks and Recreation Season 5",
  partOfSlugs: ["parks-and-recreation"],
  position: 5,
  ownLength: 484.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2012-09-21",
  externalId: "trakt-season-18968",
  externalLink: "https://trakt.tv/shows/parks-and-recreation/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
