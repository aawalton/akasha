import type { Show } from "../show.page-type.ts"

export const ncis = {
  id: "01a06802-9332-700c-9fc5-1ad0b6727f03",
  pageTypeSlug: "show",
  slug: "ncis",
  title: "NCIS",
  partOfSlugs: ["ncis-2"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2003-09-23",
  externalLink: "https://trakt.tv/shows/ncis",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
