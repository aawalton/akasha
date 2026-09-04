import type { Season } from "../season.page-type.ts"

export const elementarySeason4 = {
  id: "01a06802-b8b9-7036-94e3-205fd439093d",
  pageTypeSlug: "season",
  slug: "elementary-season-4",
  title: "Elementary Season 4",
  partOfSlugs: ["elementary"],
  position: 4,
  ownLength: 1021.2,
  ownProgress: 1021.2,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2015-11-06",
  externalId: "trakt-season-112130",
  externalLink: "https://trakt.tv/shows/elementary/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
