import type { Season } from "../season.page-type.ts"

export const rwbyVolume8 = {
  id: "01a06802-b8bc-702b-9d88-1058281c7d5b",
  pageTypeSlug: "season",
  slug: "rwby-volume-8",
  title: "RWBY Volume 8",
  partOfSlugs: ["rwby-2"],
  position: 8,
  ownLength: 258,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2020-11-07",
  externalLink: "https://trakt.tv/shows/rwby/seasons/8",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
