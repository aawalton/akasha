import type { Season } from "../season.page-type.ts"

export const ncisSpecials = {
  id: "01a06802-b8bb-7037-9f59-3ce9ba4d21a8",
  pageTypeSlug: "season",
  slug: "ncis-specials",
  title: "NCIS Specials",
  partOfSlugs: ["ncis"],
  position: 0,
  ownLength: 765,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2007-04-10",
  externalId: "trakt-season-14539",
  externalLink: "https://trakt.tv/shows/ncis/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
