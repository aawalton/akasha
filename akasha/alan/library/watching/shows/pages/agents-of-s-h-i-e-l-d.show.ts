import type { Show } from "../show.page-type.ts"

export const agentsOfSHIELD = {
  id: "01a06802-9331-7003-b4c8-5299632445ac",
  pageTypeSlug: "show",
  slug: "agents-of-s-h-i-e-l-d",
  title: "Agents of S.H.I.E.L.D.",
  partOfSlugs: ["marvel-television"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2013-09-24",
  externalLink: "https://trakt.tv/shows/marvel-s-agents-of-s-h-i-e-l-d",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
