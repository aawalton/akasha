import type { Season } from "../season.page-type.ts"

export const ncisLosAngelesSeason1 = {
  id: "01a06802-b8bb-700a-94d9-066861f47b5c",
  pageTypeSlug: "season",
  slug: "ncis-los-angeles-season-1",
  title: "NCIS: Los Angeles Season 1",
  partOfSlugs: ["ncis-los-angeles"],
  position: 1,
  ownLength: 1042.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2009-09-23",
  externalId: "trakt-season-29185",
  externalLink: "https://trakt.tv/shows/ncis-los-angeles/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
