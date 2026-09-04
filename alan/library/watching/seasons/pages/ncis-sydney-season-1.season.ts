import type { Season } from "../season.page-type.ts"

export const ncisSydneySeason1 = {
  id: "01a06802-b8bb-7038-b442-ec7f2812aaa8",
  pageTypeSlug: "season",
  slug: "ncis-sydney-season-1",
  title: "NCIS: Sydney Season 1",
  partOfSlugs: ["ncis-sydney"],
  position: 1,
  ownLength: 348,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2023-11-10",
  externalId: "trakt-season-303855",
  externalLink: "https://trakt.tv/shows/ncis-sydney/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
