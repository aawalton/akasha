import type { Season } from "../season.page-type.ts"

export const crusadeSpecials = {
  id: "01a06802-b8b8-7046-8068-e7142b1adfa0",
  pageTypeSlug: "season",
  slug: "crusade-specials",
  title: "Crusade Specials",
  partOfSlugs: ["crusade"],
  position: 0,
  ownLength: 21,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "1999-09-13",
  externalId: "0",
  externalLink: "https://trakt.tv/shows/crusade/seasons/0",
  lastSyncedAt: "2025-12-20",
} as const satisfies Season
