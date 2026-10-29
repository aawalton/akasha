import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason6 = {
  id: "01a06802-b8be-7025-bbf0-c665064f9b67",
  type: "page-type/season",
  slug: "studio-c-season-6",
  title: "Studio C Season 6",
  partOfCollections: ["show/studio-c"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-09-08",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-116020",
      externalLink: "https://trakt.tv/shows/studio-c/seasons/6",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
  progressedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Season
