import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const marvelSAgentCarterSeason1 = {
  id: "01a06802-b8ba-7036-b8dc-fdc12bc0b132",
  type: "page-type/season",
  slug: "marvel-s-agent-carter-season-1",
  title: "Marvel's Agent Carter Season 1",
  partOfCollections: ["show/agent-carter"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-01-07",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-83598",
      externalLink: "https://trakt.tv/shows/marvel-s-agent-carter/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T16:28:12.432Z",
  progressedAt: "2026-10-29T16:28:12.432Z",
} as const satisfies Season
