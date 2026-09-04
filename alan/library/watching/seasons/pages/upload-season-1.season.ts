import type { Season } from "../season.page-type.ts"

export const uploadSeason1 = {
  id: "01a06802-b8c0-700a-b94e-6dfd23b8c276",
  pageTypeSlug: "season",
  slug: "upload-season-1",
  title: "Upload Season 1",
  partOfSlugs: ["upload"],
  position: 1,
  ownLength: 310.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2020-05-01",
  externalId: "trakt-season-213521",
  externalLink: "https://trakt.tv/shows/upload/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
