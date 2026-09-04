import type { Season } from "../season.page-type.ts"

export const rwbyVolume1 = {
  id: "01a06802-b8bc-7024-a417-02bbcd49258e",
  pageTypeSlug: "season",
  slug: "rwby-volume-1",
  title: "RWBY Volume 1",
  partOfSlugs: ["rwby-2"],
  position: 1,
  ownLength: 126,
  ownProgress: 126,
  unitSlug: "minutes",
  status: "completed",
  rank: "A",
  publishedAt: "2013-07-18",
  externalLink: "https://trakt.tv/shows/rwby/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
