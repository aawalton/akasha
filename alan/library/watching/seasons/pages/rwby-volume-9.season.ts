import type { Season } from "../season.page-type.ts"

export const rwbyVolume9 = {
  id: "01a06802-b8bc-702c-93a9-ca4c9712ee2d",
  pageTypeSlug: "season",
  slug: "rwby-volume-9",
  title: "RWBY Volume 9",
  partOfSlugs: ["rwby-2"],
  position: 9,
  ownLength: 193.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2023-02-18",
  externalLink: "https://trakt.tv/shows/rwby/seasons/9",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
