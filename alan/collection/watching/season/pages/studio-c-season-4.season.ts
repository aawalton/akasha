import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason4 = {
  id: "01a06802-b8be-7023-bdbf-9c9f336dd86f",
  type: "page-type/season",
  slug: "studio-c-season-4",
  title: "Studio C Season 4",
  partOfCollections: ["show/studio-c"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-04-08",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-80899",
      externalLink: "https://trakt.tv/shows/studio-c/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
  progressedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Season
