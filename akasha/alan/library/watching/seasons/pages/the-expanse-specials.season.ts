import type { Season } from "../season.page-type.ts"

export const theExpanseSpecials = {
  id: "01a06802-b8bf-700f-8f56-c40105331142",
  pageTypeSlug: "season",
  slug: "the-expanse-specials",
  title: "The Expanse Specials",
  partOfSlugs: ["the-expanse"],
  position: 0,
  ownLength: 2368.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2015-12-15",
  externalId: "trakt-season-121210",
  externalLink: "https://trakt.tv/shows/the-expanse/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
