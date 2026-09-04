import type { Show } from "../show.page-type.ts"

export const castle = {
  id: "01a06802-9331-700f-9ea8-79acf4cfa58c",
  pageTypeSlug: "show",
  slug: "castle",
  title: "Castle",
  partOfSlugs: ["crime-investigation-shows", "watch-with-jen"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2009-03-09",
  externalLink: "https://trakt.tv/shows/castle",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
