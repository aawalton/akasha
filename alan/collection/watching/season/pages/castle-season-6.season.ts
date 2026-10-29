import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const castleSeason6 = {
  id: "01a06802-b8b8-702a-bc07-ef9fc0ddbf90",
  type: "page-type/season",
  slug: "castle-season-6",
  title: "Castle Season 6",
  partOfCollections: ["show/castle"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2013-09-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4094",
      externalLink: "https://trakt.tv/shows/castle/seasons/6",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
  progressedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Season
