import type { Season } from "../season.page-type.ts"

export const ncisSeason13 = {
  id: "01a06802-b8bb-7025-92ac-9abfd40e30c1",
  pageTypeSlug: "season",
  slug: "ncis-season-13",
  title: "NCIS Season 13",
  partOfSlugs: ["ncis"],
  position: 13,
  ownLength: 1017,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2015-09-23",
  externalId: "trakt-season-112177",
  externalLink: "https://trakt.tv/shows/ncis/seasons/13",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
