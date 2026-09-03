import type { Show } from "../show.page-type.ts"

export const moonKnight = {
  id: "01a06802-9332-700a-a1ac-2bf0213339a9",
  pageTypeSlug: "show",
  slug: "moon-knight",
  title: "Moon Knight",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 34,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2022-03-30",
  externalLink: "https://trakt.tv/shows/moon-knight",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
