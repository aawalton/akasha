import type { Show } from "../show.page-type.types.ts"

export const iAmGroot = {
  id: "01a06802-9332-7001-b04f-c284323ae471",
  pageTypeSlug: "show",
  type: "show",
  slug: "i-am-groot",
  title: "I Am Groot",
  partOfCollections: ["marvel-cinematic-universe"],
  position: 36,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "completed",
  publishedAt: "2022-08-10",
  externalLink: "https://trakt.tv/shows/i-am-groot",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
