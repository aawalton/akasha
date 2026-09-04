import type { Season } from "../season.page-type.ts"

export const starTrekDeepSpaceNineSpecials = {
  id: "01a06802-b8bc-704c-ad1b-2d98ff43dff2",
  pageTypeSlug: "season",
  slug: "star-trek-deep-space-nine-specials",
  title: "Star Trek: Deep Space Nine Specials",
  partOfSlugs: ["star-trek-deep-space-nine"],
  position: 0,
  ownLength: 757.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2003-02-25",
  externalId: "trakt-season-97615",
  externalLink: "https://trakt.tv/shows/star-trek-deep-space-nine/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
