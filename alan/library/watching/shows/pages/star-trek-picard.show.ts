import type { Show } from "../show.page-type.ts"

export const starTrekPicard = {
  id: "01a06802-9332-702b-82c2-0d21d3814d8d",
  pageTypeSlug: "show",
  slug: "star-trek-picard",
  title: "Star Trek: Picard",
  partOfSlugs: ["star-trek-3"],
  position: 22,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2020-01-23",
  externalLink: "https://trakt.tv/shows/star-trek-picard",
  lastSyncedAt: "2025-10-02",
} as const satisfies Show
