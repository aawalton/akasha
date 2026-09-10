import type { Show } from "../show.page-type.types.ts"

export const elementary = {
  id: "01a06802-9331-7021-98fc-a4ff176620c5",
  pageTypeSlug: "show",
  type: "show",
  slug: "elementary",
  title: "Elementary",
  partOfCollections: ["crime-investigation-shows"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "completed",
  publishedAt: "2012-09-28",
  externalLink: "https://trakt.tv/shows/elementary",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
