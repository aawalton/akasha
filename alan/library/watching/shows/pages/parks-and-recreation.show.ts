import type { Show } from "../show.page-type.ts"

export const parksAndRecreation = {
  id: "01a06802-9332-7014-a430-a9dc9a13d739",
  pageTypeSlug: "show",
  type: "show",
  slug: "parks-and-recreation",
  title: "Parks and Recreation",
  partOfCollections: ["sitcoms"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2009-04-10",
  externalLink: "https://trakt.tv/shows/parks-and-recreation",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
