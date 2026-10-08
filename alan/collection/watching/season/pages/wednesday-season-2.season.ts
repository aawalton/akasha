import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const wednesdaySeason2 = {
  id: "01a06802-b8c0-7017-be2c-cdc7ee24d7ea",
  type: "page-type/season",
  slug: "wednesday-season-2",
  title: "Wednesday Season 2",
  partOfCollections: ["show/wednesday"],
  position: 2,
  ownLength: 471,
  ownProgress: 471,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-08-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-312736",
      externalLink: "https://trakt.tv/shows/wednesday/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.968Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
