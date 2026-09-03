import type { Season } from "../season.page-type.ts"

export const ncisSeason22 = {
  id: "01a06802-b8bb-702f-a77b-42e4f75f6051",
  pageTypeSlug: "season",
  slug: "ncis-season-22",
  title: "NCIS Season 22",
  partOfSlugs: ["ncis"],
  position: 22,
  ownLength: 859.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2024-10-15",
  externalId: "trakt-season-402687",
  externalLink: "https://trakt.tv/shows/ncis/seasons/22",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
