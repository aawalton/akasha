import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekVoyagerSeason4 = {
  id: "01a06802-b8bd-7024-855c-53b5c2341f42",
  type: "page-type/season",
  slug: "star-trek-voyager-season-4",
  title: "Star Trek: Voyager Season 4",
  partOfCollections: ["show/star-trek-voyager"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1997-09-04",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-voyager/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Season
