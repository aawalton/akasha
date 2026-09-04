import type { Season } from "../season.page-type.ts"

export const ncisSeason2 = {
  id: "01a06802-b8bb-702c-bbf7-5f80474e27af",
  pageTypeSlug: "season",
  slug: "ncis-season-2",
  title: "NCIS Season 2",
  partOfSlugs: ["ncis"],
  position: 2,
  ownLength: 1008,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2004-09-29",
  externalId: "trakt-season-14541",
  externalLink: "https://trakt.tv/shows/ncis/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
