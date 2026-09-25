import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const uploadSeason4 = {
  id: "01a06802-b8c0-700d-8354-53a047d9f6d8",
  type: "page-type/season",
  slug: "upload-season-4",
  title: "Upload Season 4",
  partOfCollections: ["show/upload"],
  position: 4,
  ownLength: 154.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-08-26",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-474147",
      externalLink: "https://trakt.tv/shows/upload/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
