import type { Show } from "../show.page-type.types.ts"

export const deptQ = {
  id: "01a06802-9331-7019-b91d-07a999ffa900",
  pageTypeSlug: "show",
  type: "show",
  slug: "dept-q",
  title: "Dept. Q",
  partOfCollections: ["crime-investigation-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "following",
  publishedAt: "2025-05-29",
  externalLink: "https://trakt.tv/shows/dept-q",
  lastSyncedAt: "2026-01-02",
} as const satisfies Show
