import type { Show } from "../show.page-type.ts"

export const ahsoka = {
  id: "01a06802-9331-7004-bb3e-0cc318b540b4",
  pageTypeSlug: "show",
  slug: "ahsoka",
  title: "Ahsoka",
  partOfSlugs: ["star-wars-2"],
  position: 22,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2023-08-22",
  externalLink: "https://trakt.tv/shows/ahsoka",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
