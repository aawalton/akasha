import type { Season } from "../season.page-type.ts"

export const elementarySeason3 = {
  id: "01a06802-b8b9-7035-b3ea-93836f101935",
  pageTypeSlug: "season",
  slug: "elementary-season-3",
  title: "Elementary Season 3",
  partOfSlugs: ["elementary"],
  position: 3,
  ownLength: 1018.8,
  ownProgress: 1018.8,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2014-10-31",
  externalId: "trakt-season-4060",
  externalLink: "https://trakt.tv/shows/elementary/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
