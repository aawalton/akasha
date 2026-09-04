import type { Show } from "../show.page-type.ts"

export const friends = {
  id: "01a06802-9331-7027-a7a5-c33a3e8acd9d",
  pageTypeSlug: "show",
  slug: "friends",
  title: "Friends",
  partOfSlugs: ["sitcoms"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1994-09-23",
  externalLink: "https://trakt.tv/shows/friends",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
