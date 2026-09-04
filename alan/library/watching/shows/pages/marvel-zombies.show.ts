import type { Show } from "../show.page-type.ts"

export const marvelZombies = {
  id: "01a06802-9332-7009-bfe5-9d16dfa41801",
  pageTypeSlug: "show",
  slug: "marvel-zombies",
  title: "Marvel Zombies",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 59,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2025-09-24",
  externalLink: "https://trakt.tv/shows/marvel-zombies",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
