import type { Show } from "../show.page-type.ts"

export const ncisOrigins = {
  id: "01a06802-9332-7010-8b0b-c351e681cc37",
  pageTypeSlug: "show",
  slug: "ncis-origins",
  title: "NCIS: Origins",
  partOfSlugs: ["ncis-2"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2024-10-14",
  externalLink: "https://trakt.tv/shows/ncis-origins",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
