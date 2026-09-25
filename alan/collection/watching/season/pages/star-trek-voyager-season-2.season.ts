import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekVoyagerSeason2 = {
  id: "01a06802-b8bd-7022-9a39-274dcac57113",
  type: "page-type/season",
  slug: "star-trek-voyager-season-2",
  title: "Star Trek: Voyager Season 2",
  partOfCollections: ["show/star-trek-voyager"],
  position: 2,
  ownLength: 1195.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1995-08-29",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-voyager/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
