import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const marvelSThePunisherSeason2 = {
  id: "01a06802-b8ba-7052-a326-01712a32ee85",
  type: "page-type/season",
  slug: "marvel-s-the-punisher-season-2",
  title: "Marvel's The Punisher Season 2",
  partOfCollections: ["show/the-punisher"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-01-18",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-179126",
      externalLink: "https://trakt.tv/shows/marvel-s-the-punisher/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T15:47:05.993Z",
} as const satisfies Season
