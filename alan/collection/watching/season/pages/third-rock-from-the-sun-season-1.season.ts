import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const thirdRockFromTheSunSeason1 = {
  id: "01a06802-b8b7-7000-93e3-8326287b64ba",
  type: "page-type/season",
  slug: "third-rock-from-the-sun-season-1",
  title: "3rd Rock from the Sun Season 1",
  partOfCollections: ["show/third-rock-from-the-sun"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1996-01-09",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "1",
      externalLink: "https://trakt.tv/shows/3rd-rock-from-the-sun/seasons/1",
      lastSyncedAt: "2025-12-20",
    },
  ],
  createdAt: "2026-09-03T16:03:23.959Z",
  updatedAt: "2026-10-29T15:48:20.891Z",
} as const satisfies Season
