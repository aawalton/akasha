import type { Season } from "../season.page-type.ts"

export const parksAndRecreationSpecials = {
  id: "01a06802-b8bc-700e-a444-6d620a63050e",
  pageTypeSlug: "season",
  slug: "parks-and-recreation-specials",
  title: "Parks and Recreation Specials",
  partOfSlugs: ["parks-and-recreation"],
  position: 0,
  ownLength: 114,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2011-11-05",
  externalId: "trakt-season-18963",
  externalLink: "https://trakt.tv/shows/parks-and-recreation/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
