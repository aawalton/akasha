import type { Season } from "../season.page-type.ts"

export const ncisSeason18 = {
  id: "01a06802-b8bb-702a-bf3e-dd8732740da9",
  pageTypeSlug: "season",
  slug: "ncis-season-18",
  title: "NCIS Season 18",
  partOfSlugs: ["ncis"],
  position: 18,
  ownLength: 720,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2020-11-18",
  externalId: "trakt-season-231270",
  externalLink: "https://trakt.tv/shows/ncis/seasons/18",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
