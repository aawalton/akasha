import type { Show } from "../show.page-type.ts"

export const downtonAbbey = {
  id: "01a06802-9331-701d-aa44-e374b1434641",
  pageTypeSlug: "show",
  slug: "downton-abbey",
  title: "Downton Abbey",
  partOfSlugs: ["sitcoms"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2010-09-26",
  externalLink: "https://trakt.tv/shows/downton-abbey",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
