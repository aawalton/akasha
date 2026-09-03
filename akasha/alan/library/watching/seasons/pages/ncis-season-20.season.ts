import type { Season } from "../season.page-type.ts"

export const ncisSeason20 = {
  id: "01a06802-b8bb-702d-a229-b9ef1694934e",
  pageTypeSlug: "season",
  slug: "ncis-season-20",
  title: "NCIS Season 20",
  partOfSlugs: ["ncis"],
  position: 20,
  ownLength: 961.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2022-09-20",
  externalId: "trakt-season-297915",
  externalLink: "https://trakt.tv/shows/ncis/seasons/20",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
