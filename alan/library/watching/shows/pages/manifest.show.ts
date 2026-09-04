import type { Show } from "../show.page-type.ts"

export const manifest = {
  id: "01a06802-9332-7008-be14-d612bae3fa84",
  pageTypeSlug: "show",
  slug: "manifest",
  title: "Manifest",
  partOfSlugs: ["watch-with-jen"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "in-progress",
  publishedAt: "2018-09-24",
  externalId: "manifest",
  externalLink: "https://trakt.tv/shows/manifest",
  lastSyncedAt: "2026-01-01",
} as const satisfies Show
