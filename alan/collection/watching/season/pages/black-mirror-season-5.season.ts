import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const blackMirrorSeason5 = {
  id: "01a06802-b8b8-7007-8796-cc75362fb4d4",
  type: "page-type/season",
  slug: "black-mirror-season-5",
  title: "Black Mirror Season 5",
  partOfCollections: ["show/black-mirror"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-06-05",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-190448",
      externalLink: "https://trakt.tv/shows/black-mirror/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:24:53.673Z",
} as const satisfies Season
