import type { Show } from "../show.page-type.ts"

export const deptQ = {
  id: "01a06802-9331-7019-b91d-07a999ffa900",
  pageTypeSlug: "show",
  slug: "dept-q",
  title: "Dept. Q",
  partOfSlugs: ["crime-investigation-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "following",
  publishedAt: "2025-05-29",
  externalLink: "https://trakt.tv/shows/dept-q",
  lastSyncedAt: "2026-01-02",
} as const satisfies Show
