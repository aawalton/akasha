import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayNuclearFamily = {
  id: "01a0676a-d726-7003-9932-a336656fa492",
  type: "page-type/release",
  slug: "green-day-nuclear-family",
  title: "Nuclear Family",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 3.052433,
  ownProgress: 3.052433,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2012-09-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2eNZY34FfJ6ZURgN3jw5ee",
      externalLink: "https://open.spotify.com/album/2eNZY34FfJ6ZURgN3jw5ee",
      lastSyncedAt: "2025-10-04",
    },
  ],
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
