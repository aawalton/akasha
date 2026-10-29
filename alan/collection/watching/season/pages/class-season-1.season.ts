import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const classSeason1 = {
  id: "01a06802-b8b8-702e-b64e-53601eb68733",
  type: "page-type/season",
  slug: "class-season-1",
  title: "Class Season 1",
  partOfCollections: ["show/show-class"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2016-10-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-125593",
      externalLink: "https://trakt.tv/shows/class/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:40:29.924Z",
} as const satisfies Season
