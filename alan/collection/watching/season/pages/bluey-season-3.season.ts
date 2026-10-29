import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const blueySeason3 = {
  id: "01a06802-b8b8-700d-9331-ba694dce0892",
  type: "page-type/season",
  slug: "bluey-season-3",
  title: "Bluey Season 3",
  partOfCollections: ["show/bluey"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-09-04",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-270796",
      externalLink: "https://trakt.tv/shows/bluey-2018/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Season
