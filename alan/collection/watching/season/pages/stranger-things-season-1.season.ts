import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const strangerThingsSeason1 = {
  id: "01a06802-b8be-7013-9320-9c4b162ab096",
  type: "page-type/season",
  slug: "stranger-things-season-1",
  title: "Stranger Things Season 1",
  partOfCollections: ["show/stranger-things"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2016-07-15",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-121243",
      externalLink: "https://trakt.tv/shows/stranger-things/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:44:31.505Z",
} as const satisfies Season
