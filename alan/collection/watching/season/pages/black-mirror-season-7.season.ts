import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const blackMirrorSeason7 = {
  id: "01a06802-b8b8-7009-ae27-6123826030e7",
  type: "page-type/season",
  slug: "black-mirror-season-7",
  title: "Black Mirror Season 7",
  partOfCollections: ["show/black-mirror"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-04-10",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-342449",
      externalLink: "https://trakt.tv/shows/black-mirror/seasons/7",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:24:53.673Z",
} as const satisfies Season
