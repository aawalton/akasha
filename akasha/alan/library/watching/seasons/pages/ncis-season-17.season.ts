import type { Season } from "../season.page-type.ts"

export const ncisSeason17 = {
  id: "01a06802-b8bb-7029-8d5a-36db20d41996",
  pageTypeSlug: "season",
  slug: "ncis-season-17",
  title: "NCIS Season 17",
  partOfSlugs: ["ncis"],
  position: 17,
  ownLength: 849,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2019-09-25",
  externalId: "trakt-season-192646",
  externalLink: "https://trakt.tv/shows/ncis/seasons/17",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
