import type { Season } from "../season.page-type.ts"

export const rwbyVolume4 = {
  id: "01a06802-b8bc-7027-99f3-01d0dc1c6113",
  pageTypeSlug: "season",
  slug: "rwby-volume-4",
  title: "RWBY Volume 4",
  partOfSlugs: ["rwby-2"],
  position: 4,
  ownLength: 205.8,
  ownProgress: 205.8,
  unitSlug: "minutes",
  status: "completed",
  rank: "A",
  publishedAt: "2016-10-22",
  externalLink: "https://trakt.tv/shows/rwby/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
