import type { Season } from "../season.page-type.ts"

export const elementarySeason1 = {
  id: "01a06802-b8b9-7033-86c7-f72b928ae9b3",
  pageTypeSlug: "season",
  slug: "elementary-season-1",
  title: "Elementary Season 1",
  partOfSlugs: ["elementary"],
  position: 1,
  ownLength: 1035,
  ownProgress: 1035,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2012-09-28",
  externalId: "trakt-season-4058",
  externalLink: "https://trakt.tv/shows/elementary/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
