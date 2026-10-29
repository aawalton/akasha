import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ruriRocksSeason1 = {
  id: "01a06802-b8bc-701e-8574-32ddc4b73a52",
  type: "page-type/season",
  slug: "ruri-rocks-season-1",
  title: "Ruri Rocks Season 1",
  partOfCollections: ["show/ruri-rocks"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-07-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "1",
      externalLink: "https://trakt.tv/shows/ruri-rocks/seasons/1",
      lastSyncedAt: "2025-11-30",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T15:40:10.927Z",
} as const satisfies Season
