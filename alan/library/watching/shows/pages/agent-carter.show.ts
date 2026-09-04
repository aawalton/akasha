import type { Show } from "../show.page-type.ts"

export const agentCarter = {
  id: "01a06802-9331-7002-84e4-94d1056ceb8e",
  pageTypeSlug: "show",
  slug: "agent-carter",
  title: "Agent Carter",
  partOfSlugs: ["marvel-television"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2015-01-07",
  externalLink: "https://trakt.tv/shows/marvel-s-agent-carter",
  lastSyncedAt: "2025-10-01",
} as const satisfies Show
