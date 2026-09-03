import type { Season } from "../season.page-type.ts"

export const ncisOriginsSeason1 = {
  id: "01a06802-b8bb-7020-b3eb-72d84e1f1720",
  pageTypeSlug: "season",
  slug: "ncis-origins-season-1",
  title: "NCIS: Origins Season 1",
  partOfSlugs: ["ncis-origins"],
  position: 1,
  ownLength: 790.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2024-10-15",
  externalId: "trakt-season-353238",
  externalLink: "https://trakt.tv/shows/ncis-origins/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
