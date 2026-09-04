import type { Show } from "../show.page-type.ts"

export const starWarsResistance = {
  id: "01a06802-9332-7033-93b1-0840063ce7ee",
  pageTypeSlug: "show",
  slug: "star-wars-resistance",
  title: "Star Wars Resistance",
  partOfSlugs: ["star-wars-2"],
  position: 14,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2018-10-08",
  externalLink: "https://trakt.tv/shows/star-wars-resistance",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
