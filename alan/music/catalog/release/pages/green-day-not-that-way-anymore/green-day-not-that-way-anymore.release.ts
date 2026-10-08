import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayNotThatWayAnymore = {
  id: "01a0676a-d725-707c-8475-3f0798b10d6d",
  type: "page-type/release",
  slug: "green-day-not-that-way-anymore",
  title: "Not That Way Anymore",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 2.878683,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  grade: "C",
  publishedAt: "2020-10-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1eSLx5xEn6lnoMVP4KwI23",
      externalLink: "https://open.spotify.com/album/1eSLx5xEn6lnoMVP4KwI23",
      lastSyncedAt: "2025-10-04",
    },
  ],
  createdAt: "2026-09-03T13:17:30.277Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
