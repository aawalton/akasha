import type { Show } from "../show.page-type.ts"

export const peacemaker = {
  id: "01a06802-9332-7015-b90c-cf51ff16fd9c",
  pageTypeSlug: "show",
  slug: "peacemaker",
  title: "Peacemaker",
  partOfSlugs: ["dc-universe"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2003-10-06",
  externalLink: "https://trakt.tv/shows/peacemaker",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
