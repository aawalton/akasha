import type { Season } from "../season.page-type.ts"

export const ncisSeason21 = {
  id: "01a06802-b8bb-702e-b1f6-15877b7bd3a2",
  pageTypeSlug: "season",
  slug: "ncis-season-21",
  title: "NCIS Season 21",
  partOfSlugs: ["ncis"],
  position: 21,
  ownLength: 435,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2024-02-13",
  externalId: "trakt-season-340953",
  externalLink: "https://trakt.tv/shows/ncis/seasons/21",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
