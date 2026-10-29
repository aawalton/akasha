import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekShortTreksSeason1 = {
  id: "01a06802-b8bd-7012-9264-9b07f7497286",
  type: "page-type/season",
  slug: "star-trek-short-treks-season-1",
  title: "Star Trek: Short Treks Season 1",
  partOfCollections: ["show/star-trek-short-treks"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-10-03",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-short-treks/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-10-29T15:41:53.775Z",
} as const satisfies Season
