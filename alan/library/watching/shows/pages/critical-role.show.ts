import type { Show } from "../show.page-type.ts"

export const criticalRole = {
  id: "01a06802-9331-7015-96a3-52b48ac3d274",
  pageTypeSlug: "show",
  slug: "critical-role",
  title: "Critical Role",
  partOfSlugs: ["dungeons-and-dragons-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2015-03-12",
  externalLink: "https://trakt.tv/shows/critical-role",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
