import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekVoyagerSeason6 = {
  id: "01a06802-b8bd-7026-a0e9-0c5fced6df65",
  type: "page-type/season",
  slug: "star-trek-voyager-season-6",
  title: "Star Trek: Voyager Season 6",
  partOfCollections: ["show/star-trek-voyager"],
  position: 6,
  ownLength: 1144.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1999-09-23",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-voyager/seasons/6",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
