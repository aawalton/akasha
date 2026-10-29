import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const marvelSJessicaJonesSeason1 = {
  id: "01a06802-b8ba-7048-9d5d-0994489e2634",
  type: "page-type/season",
  slug: "marvel-s-jessica-jones-season-1",
  title: "Marvel's Jessica Jones Season 1",
  partOfCollections: ["show/jessica-jones"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2015-11-20",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-104148",
      externalLink: "https://trakt.tv/shows/marvel-s-jessica-jones/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T15:31:47.755Z",
} as const satisfies Season
