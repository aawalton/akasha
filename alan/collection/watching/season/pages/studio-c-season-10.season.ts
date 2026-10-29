import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason10 = {
  id: "01a06802-b8be-7015-beb5-f0dacd64cfbe",
  type: "page-type/season",
  slug: "studio-c-season-10",
  title: "Studio C Season 10",
  partOfCollections: ["show/studio-c"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-10-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-200139",
      externalLink: "https://trakt.tv/shows/studio-c/seasons/10",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
  progressedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Season
