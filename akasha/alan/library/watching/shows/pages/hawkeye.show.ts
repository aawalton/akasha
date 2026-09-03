import type { Show } from "../show.page-type.ts"

export const hawkeye = {
  id: "01a06802-9331-702d-b007-506640a3957c",
  pageTypeSlug: "show",
  slug: "hawkeye",
  title: "Hawkeye",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 32,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2021-11-24",
  externalLink: "https://trakt.tv/shows/hawkeye-2021",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
