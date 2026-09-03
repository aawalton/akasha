import type { Show } from "../show.page-type.ts"

export const starWarsRebels = {
  id: "01a06802-9332-7032-b9a5-0e30a3be811f",
  pageTypeSlug: "show",
  slug: "star-wars-rebels",
  title: "Star Wars Rebels",
  partOfSlugs: ["star-wars-2"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2014-10-03",
  externalLink: "https://trakt.tv/shows/star-wars-rebels",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
