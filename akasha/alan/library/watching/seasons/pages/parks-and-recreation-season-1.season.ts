import type { Season } from "../season.page-type.ts"

export const parksAndRecreationSeason1 = {
  id: "01a06802-b8bc-7007-825d-4d01aa3e6254",
  pageTypeSlug: "season",
  slug: "parks-and-recreation-season-1",
  title: "Parks and Recreation Season 1",
  partOfSlugs: ["parks-and-recreation"],
  position: 1,
  ownLength: 136.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2009-04-10",
  externalId: "trakt-season-18964",
  externalLink: "https://trakt.tv/shows/parks-and-recreation/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
