import type { Season } from "../season.page-type.ts"

export const parksAndRecreationSeason2 = {
  id: "01a06802-b8bc-7008-b807-da6c08b4832d",
  pageTypeSlug: "season",
  slug: "parks-and-recreation-season-2",
  title: "Parks and Recreation Season 2",
  partOfSlugs: ["parks-and-recreation"],
  position: 2,
  ownLength: 546,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2009-09-18",
  externalId: "trakt-season-18965",
  externalLink: "https://trakt.tv/shows/parks-and-recreation/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
