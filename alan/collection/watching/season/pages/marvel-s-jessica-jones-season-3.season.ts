import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const marvelSJessicaJonesSeason3 = {
  id: "01a06802-b8ba-704a-84e1-f013e3adc5dd",
  type: "page-type/season",
  slug: "marvel-s-jessica-jones-season-3",
  title: "Marvel's Jessica Jones Season 3",
  partOfCollections: ["show/jessica-jones"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-06-14",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-191499",
      externalLink: "https://trakt.tv/shows/marvel-s-jessica-jones/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T15:31:47.755Z",
} as const satisfies Season
