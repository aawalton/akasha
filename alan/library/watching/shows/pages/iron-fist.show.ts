import type { Show } from "../show.page-type.types.ts"

export const ironFist = {
  id: "01a06802-9332-7003-96d2-c9c78222e785",
  pageTypeSlug: "show",
  type: "show",
  slug: "iron-fist",
  title: "Iron Fist",
  partOfCollections: ["marvel-television"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2017-03-17",
  externalLink: "https://trakt.tv/shows/marvel-s-iron-fist",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
