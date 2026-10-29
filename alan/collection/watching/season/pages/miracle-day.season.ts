import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const miracleDay = {
  id: "01a06802-b8bb-7002-a6f7-6d575623184a",
  type: "page-type/season",
  slug: "miracle-day",
  title: "Miracle Day",
  partOfCollections: ["show/torchwood"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-07-14",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-1390",
      externalLink: "https://trakt.tv/shows/torchwood/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Season
