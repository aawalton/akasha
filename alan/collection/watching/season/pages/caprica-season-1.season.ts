import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const capricaSeason1 = {
  id: "01a06802-b8b8-7023-9131-c1d659071485",
  type: "page-type/season",
  slug: "caprica-season-1",
  title: "Caprica Season 1",
  partOfCollections: ["show/caprica"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2010-01-23",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-2811",
      externalLink: "https://trakt.tv/shows/caprica/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:25:16.463Z",
} as const satisfies Season
