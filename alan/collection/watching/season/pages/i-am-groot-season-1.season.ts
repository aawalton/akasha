import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const iAmGrootSeason1 = {
  id: "01a06802-b8ba-7029-b8a6-906af599bfc8",
  type: "page-type/season",
  slug: "i-am-groot-season-1",
  title: "I Am Groot Season 1",
  partOfCollections: ["show/i-am-groot"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-08-10",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-330045",
      externalLink: "https://trakt.tv/shows/i-am-groot/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T16:29:32.180Z",
  progressedAt: "2026-10-29T16:29:32.180Z",
} as const satisfies Season
