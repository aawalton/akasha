import type { Show } from "../show.page-type.ts"

export const starWarsTheCloneWars = {
  id: "01a06802-9332-7036-90db-d248fda1171d",
  pageTypeSlug: "show",
  slug: "star-wars-the-clone-wars",
  title: "Star Wars: The Clone Wars",
  partOfSlugs: ["star-wars-2"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2008-10-03",
  externalLink: "https://trakt.tv/shows/star-wars-the-clone-wars",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
