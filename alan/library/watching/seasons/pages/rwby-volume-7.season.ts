import type { Season } from "../season.page-type.ts"

export const rwbyVolume7 = {
  id: "01a06802-b8bc-702a-b919-d0f9b948de11",
  pageTypeSlug: "season",
  slug: "rwby-volume-7",
  title: "RWBY Volume 7",
  partOfSlugs: ["rwby-2"],
  position: 7,
  ownLength: 232.8,
  ownProgress: 232.8,
  unitSlug: "minutes",
  status: "completed",
  rank: "A",
  publishedAt: "2019-11-02",
  externalLink: "https://trakt.tv/shows/rwby/seasons/7",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
