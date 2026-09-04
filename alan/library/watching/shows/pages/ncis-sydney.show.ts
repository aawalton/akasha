import type { Show } from "../show.page-type.ts"

export const ncisSydney = {
  id: "01a06802-9332-7011-8ab6-fcf2d579aaa5",
  pageTypeSlug: "show",
  slug: "ncis-sydney",
  title: "NCIS: Sydney",
  partOfSlugs: ["ncis-2"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2023-11-10",
  externalLink: "https://trakt.tv/shows/ncis-sydney",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
