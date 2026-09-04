import type { Season } from "../season.page-type.ts"

export const ncisLosAngelesSeason6 = {
  id: "01a06802-b8bb-7014-b96d-f0adaca416f4",
  pageTypeSlug: "season",
  slug: "ncis-los-angeles-season-6",
  title: "NCIS: Los Angeles Season 6",
  partOfSlugs: ["ncis-los-angeles"],
  position: 6,
  ownLength: 1080,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2014-09-30",
  externalId: "trakt-season-91204",
  externalLink: "https://trakt.tv/shows/ncis-los-angeles/seasons/6",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
