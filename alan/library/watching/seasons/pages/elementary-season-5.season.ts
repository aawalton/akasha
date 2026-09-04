import type { Season } from "../season.page-type.ts"

export const elementarySeason5 = {
  id: "01a06802-b8b9-7037-9dac-6b05a8fad5b6",
  pageTypeSlug: "season",
  slug: "elementary-season-5",
  title: "Elementary Season 5",
  partOfSlugs: ["elementary"],
  position: 5,
  ownLength: 1018.2,
  ownProgress: 1018.2,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2016-10-03",
  externalId: "trakt-season-127192",
  externalLink: "https://trakt.tv/shows/elementary/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
