import type { Season } from "../season.page-type.ts"

export const ncisSeason16 = {
  id: "01a06802-b8bb-7028-9259-e74f9f394d44",
  pageTypeSlug: "season",
  type: "season",
  slug: "ncis-season-16",
  title: "NCIS Season 16",
  partOfCollections: ["ncis"],
  position: 16,
  ownLength: 1018.8,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2018-09-26",
  externalId: "trakt-season-167748",
  externalLink: "https://trakt.tv/shows/ncis/seasons/16",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
