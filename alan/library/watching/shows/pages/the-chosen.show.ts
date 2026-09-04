import type { Show } from "../show.page-type.ts"

export const theChosen = {
  id: "01a06802-9332-7044-ba34-6521f4f44287",
  pageTypeSlug: "show",
  slug: "the-chosen",
  title: "The Chosen",
  partOfSlugs: ["award-winning-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  rank: "S",
  publishedAt: "2019-04-21",
  externalLink: "https://trakt.tv/shows/the-chosen",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
