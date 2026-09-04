import type { Show } from "../show.page-type.ts"

export const rwby2 = {
  id: "01a06802-9332-701c-b9ba-0b05d7b34b33",
  pageTypeSlug: "show",
  slug: "rwby-2",
  title: "RWBY",
  partOfSlugs: ["rwby"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "following",
  rank: "A",
  publishedAt: "2013-07-18",
  externalId: "rwby",
  externalLink: "https://trakt.tv/shows/rwby",
  lastSyncedAt: "2026-01-16",
} as const satisfies Show
