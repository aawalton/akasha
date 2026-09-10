import type { Season } from "../season.page-type.types.ts"

export const uploadSeason2 = {
  id: "01a06802-b8c0-700b-bd2c-c68810077031",
  pageTypeSlug: "season",
  type: "season",
  slug: "upload-season-2",
  title: "Upload Season 2",
  partOfCollections: ["upload"],
  position: 2,
  ownLength: 229.8,
  ownProgress: 0,
  unit: "minutes",
  status: "not-started",
  publishedAt: "2022-03-11",
  externalId: "trakt-season-240786",
  externalLink: "https://trakt.tv/shows/upload/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
