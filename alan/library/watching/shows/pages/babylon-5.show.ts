import type { Show } from "../show.page-type.ts"

export const babylon5 = {
  id: "01a06802-9331-7008-bb33-49c6381eabf6",
  pageTypeSlug: "show",
  slug: "babylon-5",
  title: "Babylon 5",
  partOfSlugs: ["babylon-5-2"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1994-01-27",
  externalId: "babylon-5",
  externalLink: "https://trakt.tv/shows/babylon-5",
  lastSyncedAt: "2025-12-20",
} as const satisfies Show
