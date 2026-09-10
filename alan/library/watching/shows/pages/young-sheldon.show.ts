import type { Show } from "../show.page-type.types.ts"

export const youngSheldon = {
  id: "01a06802-9333-7011-b346-db5cd5909917",
  pageTypeSlug: "show",
  type: "show",
  slug: "young-sheldon",
  title: "Young Sheldon",
  partOfCollections: ["sitcoms"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2017-09-26",
  externalLink: "https://trakt.tv/shows/young-sheldon",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
