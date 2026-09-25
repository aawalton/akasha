import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const marvelSInhumansSeason1 = {
  id: "01a06802-b8ba-7045-8ff7-dc38cea2a068",
  type: "page-type/season",
  slug: "marvel-s-inhumans-season-1",
  title: "Marvel's Inhumans Season 1",
  partOfCollections: ["show/inhumans"],
  position: 1,
  ownLength: 354,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-09-30",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-135980",
      externalLink: "https://trakt.tv/shows/marvel-s-inhumans/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
