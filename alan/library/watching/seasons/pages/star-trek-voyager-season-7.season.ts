import type { Season } from "../season.page-type.ts"

export const starTrekVoyagerSeason7 = {
  id: "01a06802-b8bd-7027-8157-335ff123fc9b",
  pageTypeSlug: "season",
  type: "season",
  slug: "star-trek-voyager-season-7",
  title: "Star Trek: Voyager Season 7",
  partOfCollections: ["star-trek-voyager"],
  position: 7,
  ownLength: 1182,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2000-10-05",
  externalLink: "https://trakt.tv/shows/star-trek-voyager/seasons/7",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
