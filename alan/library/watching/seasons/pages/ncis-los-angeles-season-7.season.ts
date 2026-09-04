import type { Season } from "../season.page-type.ts"

export const ncisLosAngelesSeason7 = {
  id: "01a06802-b8bb-7015-838b-72849d95f033",
  pageTypeSlug: "season",
  slug: "ncis-los-angeles-season-7",
  title: "NCIS: Los Angeles Season 7",
  partOfSlugs: ["ncis-los-angeles"],
  position: 7,
  ownLength: 1080,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2015-09-22",
  externalId: "trakt-season-112238",
  externalLink: "https://trakt.tv/shows/ncis-los-angeles/seasons/7",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
