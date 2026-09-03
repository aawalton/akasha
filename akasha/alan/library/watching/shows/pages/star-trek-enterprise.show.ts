import type { Show } from "../show.page-type.ts"

export const starTrekEnterprise = {
  id: "01a06802-9332-7029-99ed-17c2339b64ba",
  pageTypeSlug: "show",
  slug: "star-trek-enterprise",
  title: "Star Trek: Enterprise",
  partOfSlugs: ["star-trek-3"],
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2001-09-26",
  externalLink: "https://trakt.tv/shows/star-trek-enterprise",
  lastSyncedAt: "2025-10-02",
} as const satisfies Show
