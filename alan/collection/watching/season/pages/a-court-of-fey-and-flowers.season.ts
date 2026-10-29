import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const aCourtOfFeyAndFlowers = {
  id: "01a06802-b8b7-7007-91b6-8315bb742bd9",
  type: "page-type/season",
  slug: "a-court-of-fey-and-flowers",
  title: "A Court of Fey & Flowers",
  partOfCollections: ["show/dimension-20"],
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-08-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-299640",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/15",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.959Z",
  updatedAt: "2026-10-29T15:27:49.638Z",
} as const satisfies Season
