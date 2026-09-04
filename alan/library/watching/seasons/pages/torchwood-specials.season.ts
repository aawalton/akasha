import type { Season } from "../season.page-type.ts"

export const torchwoodSpecials = {
  id: "01a06802-b8c0-7009-96c4-2f93898490c6",
  pageTypeSlug: "season",
  slug: "torchwood-specials",
  title: "Torchwood Specials",
  partOfSlugs: ["torchwood"],
  position: 0,
  ownLength: 34.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2006-12-26",
  externalId: "trakt-season-1386",
  externalLink: "https://trakt.tv/shows/torchwood/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
