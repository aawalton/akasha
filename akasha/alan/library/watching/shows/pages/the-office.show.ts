import type { Show } from "../show.page-type.ts"

export const theOffice = {
  id: "01a06802-9332-704e-9a9b-1dd4aa74293f",
  pageTypeSlug: "show",
  slug: "the-office",
  title: "The Office",
  partOfSlugs: ["sitcoms"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2005-03-24",
  externalLink: "https://trakt.tv/shows/the-office",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
