import type { Season } from "../season.page-type.ts"

export const elementarySeason2 = {
  id: "01a06802-b8b9-7034-97a1-09d8b749ae21",
  pageTypeSlug: "season",
  slug: "elementary-season-2",
  title: "Elementary Season 2",
  partOfSlugs: ["elementary"],
  position: 2,
  ownLength: 1030.2,
  ownProgress: 1030.2,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2013-09-27",
  externalId: "trakt-season-4059",
  externalLink: "https://trakt.tv/shows/elementary/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
