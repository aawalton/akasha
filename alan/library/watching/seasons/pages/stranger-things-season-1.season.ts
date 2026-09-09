import type { Season } from "../season.page-type.ts"

export const strangerThingsSeason1 = {
  id: "01a06802-b8be-7013-9320-9c4b162ab096",
  pageTypeSlug: "season",
  type: "season",
  slug: "stranger-things-season-1",
  title: "Stranger Things Season 1",
  partOfCollections: ["stranger-things"],
  position: 1,
  ownLength: 397.8,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2016-07-15",
  externalId: "trakt-season-121243",
  externalLink: "https://trakt.tv/shows/stranger-things/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
