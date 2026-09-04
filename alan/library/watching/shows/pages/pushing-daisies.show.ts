import type { Show } from "../show.page-type.ts"

export const pushingDaisies = {
  id: "01a06802-9332-7018-a2e6-fc08269c1842",
  pageTypeSlug: "show",
  slug: "pushing-daisies",
  title: "Pushing Daisies",
  partOfSlugs: ["crime-investigation-shows", "watch-with-jen"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2007-10-04",
  externalLink: "https://trakt.tv/shows/pushing-daisies",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
