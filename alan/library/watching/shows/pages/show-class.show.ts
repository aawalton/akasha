import type { Show } from "../show.page-type.ts"

export const showClass = {
  id: "01a06802-9331-7010-ba51-c0d25803c45e",
  pageTypeSlug: "show",
  slug: "show-class",
  title: "Class",
  partOfSlugs: ["doctor-who"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2016-10-22",
  externalLink: "https://trakt.tv/shows/class",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
