import type { Show } from "../show.page-type.ts"

export const theMandalorian = {
  id: "01a06802-9332-704c-8f8d-c57201f82d6a",
  pageTypeSlug: "show",
  type: "show",
  slug: "the-mandalorian",
  title: "The Mandalorian",
  partOfCollections: ["star-wars-2"],
  position: 16,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2019-11-12",
  externalLink: "https://trakt.tv/shows/the-mandalorian",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
