import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const aCrownOfCandy = {
  id: "01a06802-b8b7-7008-9d4c-05281b5b09fd",
  type: "page-type/season",
  slug: "a-crown-of-candy",
  title: "A Crown of Candy",
  partOfCollections: ["show/dimension-20"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-04-08",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-215669",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.959Z",
  updatedAt: "2026-10-29T15:27:49.638Z",
} as const satisfies Season
