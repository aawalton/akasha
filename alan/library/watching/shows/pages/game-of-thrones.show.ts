import type { Show } from "../show.page-type.ts"

export const gameOfThrones = {
  id: "01a06802-9331-702a-a823-8baf5684c808",
  pageTypeSlug: "show",
  slug: "game-of-thrones",
  title: "Game of Thrones",
  partOfSlugs: ["game-of-thrones-2"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2011-04-17",
  externalLink: "https://trakt.tv/shows/game-of-thrones",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
