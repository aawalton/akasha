import type { Season } from "../season.page-type.ts"

export const torchwoodSeason1 = {
  id: "01a06802-b8c0-7007-ba67-46172d70baed",
  pageTypeSlug: "season",
  slug: "torchwood-season-1",
  title: "Torchwood Season 1",
  partOfSlugs: ["torchwood"],
  position: 1,
  ownLength: 640.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2006-10-22",
  externalId: "trakt-season-1387",
  externalLink: "https://trakt.tv/shows/torchwood/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
