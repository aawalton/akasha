import type { Season } from "../season.page-type.ts"

export const severanceSpecials = {
  id: "01a06802-b8bc-7035-9f57-c43fcae6a62d",
  pageTypeSlug: "season",
  slug: "severance-specials",
  title: "Severance Specials",
  partOfSlugs: ["severance"],
  position: 0,
  ownLength: 7,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2021-12-16",
  externalId: "0",
  externalLink: "https://trakt.tv/shows/severance/seasons/0",
  lastSyncedAt: "2026-01-03",
} as const satisfies Season
