import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekVoyagerSeason5 = {
  id: "01a06802-b8bd-7025-8535-2879131832f8",
  type: "page-type/season",
  slug: "star-trek-voyager-season-5",
  title: "Star Trek: Voyager Season 5",
  partOfCollections: ["show/star-trek-voyager"],
  position: 5,
  ownLength: 1237.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1998-10-15",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-voyager/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
