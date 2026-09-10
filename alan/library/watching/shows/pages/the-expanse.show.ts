import type { Show } from "../show.page-type.types.ts"

export const theExpanse = {
  id: "01a06802-9332-7047-be1a-773a5c200330",
  pageTypeSlug: "show",
  type: "show",
  slug: "the-expanse",
  title: "The Expanse",
  partOfCollections: ["science-fiction-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2015-12-15",
  externalLink: "https://trakt.tv/shows/the-expanse",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
