import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason3 = {
  id: "01a06802-b8be-7022-9d25-20fb8a70aa0c",
  type: "page-type/season",
  slug: "studio-c-season-3",
  title: "Studio C Season 3",
  partOfCollections: ["show/studio-c"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2013-10-08",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-80785",
      externalLink: "https://trakt.tv/shows/studio-c/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
  progressedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Season
