import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason11 = {
  id: "01a06802-b8be-7016-b883-689f050deb2e",
  type: "page-type/season",
  slug: "studio-c-season-11",
  title: "Studio C Season 11",
  partOfCollections: ["show/studio-c"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-04-07",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-215176",
      externalLink: "https://trakt.tv/shows/studio-c/seasons/11",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
  progressedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Season
