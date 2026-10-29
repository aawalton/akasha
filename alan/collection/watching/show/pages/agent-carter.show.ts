import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const agentCarter = {
  id: "01a06802-9331-7002-84e4-94d1056ceb8e",
  type: "page-type/show",
  slug: "agent-carter",
  title: "Agent Carter",
  partOfCollections: ["fandom/marvel-television"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-01-07",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/marvel-s-agent-carter",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "61550", externalLink: "https://www.themoviedb.org/tv/61550" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T16:28:12.432Z",
} as const satisfies Show
