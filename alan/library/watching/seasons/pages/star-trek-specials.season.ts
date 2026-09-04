import type { Season } from "../season.page-type.ts"

export const starTrekSpecials = {
  id: "01a06802-b8bd-7014-ad44-d9de6301442c",
  pageTypeSlug: "season",
  slug: "star-trek-specials",
  title: "Star Trek Specials",
  partOfSlugs: ["star-trek-2"],
  position: 0,
  ownLength: 1461,
  ownProgress: 1461,
  unitSlug: "minutes",
  status: "archived",
  rank: "B",
  publishedAt: "1988-10-16",
  externalId: "trakt-season-922",
  externalLink: "https://trakt.tv/shows/star-trek/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
