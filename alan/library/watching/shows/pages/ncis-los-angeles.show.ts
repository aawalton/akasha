import type { Show } from "../show.page-type.ts"

export const ncisLosAngeles = {
  id: "01a06802-9332-700e-9310-84896c790548",
  pageTypeSlug: "show",
  slug: "ncis-los-angeles",
  title: "NCIS: Los Angeles",
  partOfSlugs: ["ncis-2"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2009-09-22",
  externalLink: "https://trakt.tv/shows/ncis-los-angeles",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
