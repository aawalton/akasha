import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const agentsOfSHIELD = {
  id: "01a06802-9331-7003-b4c8-5299632445ac",
  type: "page-type/show",
  slug: "agents-of-s-h-i-e-l-d",
  title: "Agents of S.H.I.E.L.D.",
  partOfCollections: ["fandom/marvel-television"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2013-09-24",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/marvel-s-agents-of-s-h-i-e-l-d",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "1403", externalLink: "https://www.themoviedb.org/tv/1403" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T16:28:25.595Z",
} as const satisfies Show
