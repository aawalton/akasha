import type { Show } from "../show.page-type.ts"

export const arcane = {
  id: "01a06802-9331-7006-9514-a731c8f42770",
  pageTypeSlug: "show",
  slug: "arcane",
  title: "Arcane",
  partOfSlugs: ["league-of-legends"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "following",
  rank: "S",
  publishedAt: "2021-11-06",
  externalLink: "https://trakt.tv/shows/arcane",
  lastSyncedAt: "2026-01-03",
} as const satisfies Show
