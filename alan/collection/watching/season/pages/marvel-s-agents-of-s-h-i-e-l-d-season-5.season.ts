import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const marvelSAgentsOfSHIELDSeason5 = {
  id: "01a06802-b8ba-703c-a0d4-b30eadd4eae7",
  type: "page-type/season",
  slug: "marvel-s-agents-of-s-h-i-e-l-d-season-5",
  title: "Marvel's Agents of S.H.I.E.L.D. Season 5",
  partOfCollections: ["show/agents-of-s-h-i-e-l-d"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-12-02",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-143872",
      externalLink: "https://trakt.tv/shows/marvel-s-agents-of-s-h-i-e-l-d/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T16:28:25.595Z",
  progressedAt: "2026-10-29T16:28:25.595Z",
} as const satisfies Season
