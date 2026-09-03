import type { Season } from "../season.page-type.ts"

export const ncisLosAngelesSeason9 = {
  id: "01a06802-b8bb-7017-bc07-98b9e7ee5b6b",
  pageTypeSlug: "season",
  slug: "ncis-los-angeles-season-9",
  title: "NCIS: Los Angeles Season 9",
  partOfSlugs: ["ncis-los-angeles"],
  position: 9,
  ownLength: 1080,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2017-10-02",
  externalId: "trakt-season-143889",
  externalLink: "https://trakt.tv/shows/ncis-los-angeles/seasons/9",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
