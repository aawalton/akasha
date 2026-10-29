import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const accelWorldSeason1 = {
  id: "01a06802-b8b7-700a-bd48-52b37ea2bf54",
  type: "page-type/season",
  slug: "accel-world-season-1",
  title: "Accel World Season 1",
  partOfCollections: ["show/accel-world-2"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2012-04-06",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/accel-world/seasons/1",
      lastSyncedAt: "2025-10-13",
    },
  ],
  createdAt: "2026-09-03T16:03:23.959Z",
  updatedAt: "2026-10-29T16:28:08.558Z",
  progressedAt: "2026-10-29T16:28:08.558Z",
} as const satisfies Season
