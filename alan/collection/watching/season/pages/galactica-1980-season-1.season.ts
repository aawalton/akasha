import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const galactica1980Season1 = {
  id: "01a06802-b8ba-7012-8412-a018dcd0607f",
  type: "page-type/season",
  slug: "galactica-1980-season-1",
  title: "Galactica 1980 Season 1",
  partOfCollections: ["show/galactica-1980"],
  position: 1,
  ownLength: 490.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1980-01-28",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-14578",
      externalLink: "https://trakt.tv/shows/galactica-1980/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
