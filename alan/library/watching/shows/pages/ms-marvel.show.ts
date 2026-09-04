import type { Show } from "../show.page-type.ts"

export const msMarvel = {
  id: "01a06802-9332-700b-8722-e329ec7e146e",
  pageTypeSlug: "show",
  slug: "ms-marvel",
  title: "Ms. Marvel",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 35,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2022-06-08",
  externalLink: "https://trakt.tv/shows/ms-marvel",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
