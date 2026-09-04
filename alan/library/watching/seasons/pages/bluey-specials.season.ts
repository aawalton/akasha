import type { Season } from "../season.page-type.ts"

export const blueySpecials = {
  id: "01a06802-b8b8-700e-86c0-43fa3118d6e0",
  pageTypeSlug: "season",
  slug: "bluey-specials",
  title: "Bluey Specials",
  partOfSlugs: ["bluey"],
  position: 0,
  ownLength: 214.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2019-12-13",
  externalId: "trakt-season-205892",
  externalLink: "https://trakt.tv/shows/bluey-2018/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
