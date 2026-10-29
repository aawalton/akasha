import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const marvelSDaredevilSeason1 = {
  id: "01a06802-b8ba-7042-8d26-72fb030d8fbb",
  type: "page-type/season",
  slug: "marvel-s-daredevil-season-1",
  title: "Marvel's Daredevil Season 1",
  partOfCollections: ["show/daredevil"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2015-04-10",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-102670",
      externalLink: "https://trakt.tv/shows/marvel-s-daredevil/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T15:27:23.641Z",
} as const satisfies Season
