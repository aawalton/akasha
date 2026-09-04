import type { Show } from "../show.page-type.ts"

export const starTrekStrangeNewWorlds = {
  id: "01a06802-9332-702e-82d4-997bd82a0e4f",
  pageTypeSlug: "show",
  slug: "star-trek-strange-new-worlds",
  title: "Star Trek: Strange New Worlds",
  partOfSlugs: ["star-trek-3"],
  position: 25,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2022-05-05",
  externalLink: "https://trakt.tv/shows/star-trek-strange-new-worlds",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
