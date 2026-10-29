import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const rwbyVolume9 = {
  id: "01a06802-b8bc-702c-93a9-ca4c9712ee2d",
  type: "page-type/season",
  slug: "rwby-volume-9",
  title: "RWBY Volume 9",
  partOfCollections: ["show/rwby-2"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-02-18",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/rwby/seasons/9",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T15:40:16.337Z",
} as const satisfies Season
