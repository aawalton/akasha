import type { Show } from "../show.page-type.ts"

export const squidGame = {
  id: "01a06802-9332-7025-a175-c90f86683f15",
  pageTypeSlug: "show",
  slug: "squid-game",
  title: "Squid Game",
  partOfSlugs: ["science-fiction-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2021-09-17",
  externalLink: "https://trakt.tv/shows/squid-game",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
