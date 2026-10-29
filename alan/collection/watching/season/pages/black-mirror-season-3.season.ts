import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const blackMirrorSeason3 = {
  id: "01a06802-b8b8-7005-afcb-ddf711dcea27",
  type: "page-type/season",
  slug: "black-mirror-season-3",
  title: "Black Mirror Season 3",
  partOfCollections: ["show/black-mirror"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2016-10-21",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-123126",
      externalLink: "https://trakt.tv/shows/black-mirror/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:24:53.673Z",
} as const satisfies Season
