import type { Show } from "../show.page-type.ts"

export const cloneWars = {
  id: "01a06802-9331-7012-bb53-8b3246658970",
  pageTypeSlug: "show",
  slug: "clone-wars",
  title: "Clone Wars",
  partOfSlugs: ["star-wars-2"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2003-11-07",
  externalLink: "https://trakt.tv/shows/star-wars-clone-wars",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
