import type { Show } from "../show.page-type.types.ts"

export const ironheart = {
  id: "01a06802-9332-7004-b436-5f6a0fdfa1fc",
  pageTypeSlug: "show",
  type: "show",
  slug: "ironheart",
  title: "Ironheart",
  partOfCollections: ["marvel-cinematic-universe"],
  position: 58,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2025-06-25",
  externalLink: "https://trakt.tv/shows/ironheart",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
