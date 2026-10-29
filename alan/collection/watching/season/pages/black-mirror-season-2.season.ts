import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const blackMirrorSeason2 = {
  id: "01a06802-b8b8-7004-a315-49a4b79d3718",
  type: "page-type/season",
  slug: "black-mirror-season-2",
  title: "Black Mirror Season 2",
  partOfCollections: ["show/black-mirror"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2013-02-11",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-53191",
      externalLink: "https://trakt.tv/shows/black-mirror/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:24:53.673Z",
} as const satisfies Season
