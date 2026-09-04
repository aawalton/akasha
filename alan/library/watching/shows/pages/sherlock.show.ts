import type { Show } from "../show.page-type.ts"

export const sherlock = {
  id: "01a06802-9332-7022-ab51-34f4a94947dc",
  pageTypeSlug: "show",
  slug: "sherlock",
  title: "Sherlock",
  partOfSlugs: ["crime-investigation-shows"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2010-07-25",
  externalLink: "https://trakt.tv/shows/sherlock",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
