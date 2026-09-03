import type { Season } from "../season.page-type.ts"

export const torchwoodSeason2 = {
  id: "01a06802-b8c0-7008-9c14-4b138beac981",
  pageTypeSlug: "season",
  slug: "torchwood-season-2",
  title: "Torchwood Season 2",
  partOfSlugs: ["torchwood"],
  position: 2,
  ownLength: 645,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2008-01-16",
  externalId: "trakt-season-1388",
  externalLink: "https://trakt.tv/shows/torchwood/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
