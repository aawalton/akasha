import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theFalconAndTheWinterSoldierMiniseries = {
  id: "01a06802-b8bf-7010-8276-9cb93a09f2c6",
  type: "page-type/season",
  slug: "the-falcon-and-the-winter-soldier-miniseries",
  title: "The Falcon and the Winter Soldier Miniseries",
  partOfCollections: ["show/the-falcon-and-the-winter-soldier"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-03-19",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-236220",
      externalLink: "https://trakt.tv/shows/the-falcon-and-the-winter-soldier/seasons/1",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T16:31:02.389Z",
  progressedAt: "2026-10-29T16:31:02.389Z",
} as const satisfies Season
