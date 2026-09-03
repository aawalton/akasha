import type { Season } from "../season.page-type.ts"

export const gravityFallsSpecials = {
  id: "01a06802-b8ba-7022-bf9f-023fe3ae7530",
  pageTypeSlug: "season",
  slug: "gravity-falls-specials",
  title: "Gravity Falls Specials",
  partOfSlugs: ["gravity-falls"],
  position: 0,
  ownLength: 1533,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2013-10-15",
  externalId: "trakt-season-52096",
  externalLink: "https://trakt.tv/shows/gravity-falls/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
