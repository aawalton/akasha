import type { Show } from "akasha/alan/library/watching/shows/show.page-type.types.ts"

export const ahsoka = {
  id: "01a06802-9331-7004-bb3e-0cc318b540b4",
  type: "show",
  slug: "ahsoka",
  title: "Ahsoka",
  partOfCollections: ["star-wars-2"],
  position: 22,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2023-08-22",
  externalLink: "https://trakt.tv/shows/ahsoka",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
