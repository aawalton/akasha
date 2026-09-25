import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekVoyagerSeason1 = {
  id: "01a06802-b8bd-7021-854e-4ac2a8354a9b",
  type: "page-type/season",
  slug: "star-trek-voyager-season-1",
  title: "Star Trek: Voyager Season 1",
  partOfCollections: ["show/star-trek-voyager"],
  position: 1,
  ownLength: 781.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1995-01-17",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-voyager/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
