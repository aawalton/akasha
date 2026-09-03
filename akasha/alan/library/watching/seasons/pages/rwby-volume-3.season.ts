import type { Season } from "../season.page-type.ts"

export const rwbyVolume3 = {
  id: "01a06802-b8bc-7026-9b7b-9bd205b5982b",
  pageTypeSlug: "season",
  slug: "rwby-volume-3",
  title: "RWBY Volume 3",
  partOfSlugs: ["rwby-2"],
  position: 3,
  ownLength: 192,
  ownProgress: 192,
  unitSlug: "minutes",
  status: "completed",
  rank: "A",
  publishedAt: "2015-10-25",
  externalLink: "https://trakt.tv/shows/rwby/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
