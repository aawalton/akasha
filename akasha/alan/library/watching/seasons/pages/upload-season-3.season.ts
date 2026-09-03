import type { Season } from "../season.page-type.ts"

export const uploadSeason3 = {
  id: "01a06802-b8c0-700c-900f-5e9da3b462ba",
  pageTypeSlug: "season",
  slug: "upload-season-3",
  title: "Upload Season 3",
  partOfSlugs: ["upload"],
  position: 3,
  ownLength: 280.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2023-10-20",
  externalId: "trakt-season-331097",
  externalLink: "https://trakt.tv/shows/upload/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
