import type { Season } from "../season.page-type.ts"

export const stevenUniverseSeason1 = {
  id: "01a06802-b8be-700a-bd24-24b4a7fd6c0a",
  pageTypeSlug: "season",
  slug: "steven-universe-season-1",
  title: "Steven Universe Season 1",
  partOfSlugs: ["steven-universe"],
  position: 1,
  ownLength: 588,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2013-11-05",
  externalId: "trakt-season-61944",
  externalLink: "https://trakt.tv/shows/steven-universe/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
