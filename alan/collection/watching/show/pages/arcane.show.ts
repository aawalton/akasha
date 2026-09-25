import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const arcane = {
  id: "01a06802-9331-7006-9514-a731c8f42770",
  type: "page-type/show",
  slug: "arcane",
  title: "Arcane",
  partOfCollections: ["fandom/league-of-legends"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  grade: "S",
  publishedAt: "2021-11-06",
  externalIdentity: [
    { source: "trakt", externalLink: "https://trakt.tv/shows/arcane", lastSyncedAt: "2026-01-03" },
  ],
} as const satisfies Show
