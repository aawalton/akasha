import type { Season } from "../season.page-type.ts"

export const rwbyVolume6 = {
  id: "01a06802-b8bc-7029-9332-0d64f288d04d",
  pageTypeSlug: "season",
  slug: "rwby-volume-6",
  title: "RWBY Volume 6",
  partOfSlugs: ["rwby-2"],
  position: 6,
  ownLength: 225,
  ownProgress: 225,
  unitSlug: "minutes",
  status: "completed",
  rank: "A",
  publishedAt: "2018-10-27",
  externalLink: "https://trakt.tv/shows/rwby/seasons/6",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
