import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const iAmGrootSeason2 = {
  id: "01a06802-b8ba-702a-a3a1-0cff11f78778",
  type: "page-type/season",
  slug: "i-am-groot-season-2",
  title: "I Am Groot Season 2",
  partOfCollections: ["show/i-am-groot"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-09-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-330590",
      externalLink: "https://trakt.tv/shows/i-am-groot/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T16:29:32.180Z",
  progressedAt: "2026-10-29T16:29:32.180Z",
} as const satisfies Season
