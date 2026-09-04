import type { Show } from "../show.page-type.ts"

export const starWarsTheBadBatch = {
  id: "01a06802-9332-7035-bff6-868562b45cd1",
  pageTypeSlug: "show",
  slug: "star-wars-the-bad-batch",
  title: "Star Wars: The Bad Batch",
  partOfSlugs: ["star-wars-2"],
  position: 17,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2021-05-04",
  externalLink: "https://trakt.tv/shows/star-wars-the-bad-batch",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
