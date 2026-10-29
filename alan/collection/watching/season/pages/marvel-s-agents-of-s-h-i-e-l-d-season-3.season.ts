import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const marvelSAgentsOfSHIELDSeason3 = {
  id: "01a06802-b8ba-703a-9a19-55c6940b0e10",
  type: "page-type/season",
  slug: "marvel-s-agents-of-s-h-i-e-l-d-season-3",
  title: "Marvel's Agents of S.H.I.E.L.D. Season 3",
  partOfCollections: ["show/agents-of-s-h-i-e-l-d"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-09-30",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-112236",
      externalLink: "https://trakt.tv/shows/marvel-s-agents-of-s-h-i-e-l-d/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T16:28:25.595Z",
  progressedAt: "2026-10-29T16:28:25.595Z",
} as const satisfies Season
