import type { Season } from "../season.page-type.ts"

export const babylon5Specials = {
  id: "01a06802-b8b7-7017-9083-6a60b9456d2c",
  pageTypeSlug: "season",
  slug: "babylon-5-specials",
  title: "Babylon 5 Specials",
  partOfSlugs: ["babylon-5"],
  position: 0,
  ownLength: 2929,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "1993-02-23",
  externalId: "0",
  externalLink: "https://trakt.tv/shows/babylon-5/seasons/0",
  lastSyncedAt: "2025-12-20",
} as const satisfies Season
