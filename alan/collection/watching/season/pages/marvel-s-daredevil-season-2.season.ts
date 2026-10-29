import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const marvelSDaredevilSeason2 = {
  id: "01a06802-b8ba-7043-987a-b201c8432bab",
  type: "page-type/season",
  slug: "marvel-s-daredevil-season-2",
  title: "Marvel's Daredevil Season 2",
  partOfCollections: ["show/daredevil"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2016-03-18",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-117388",
      externalLink: "https://trakt.tv/shows/marvel-s-daredevil/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T15:27:23.641Z",
} as const satisfies Season
