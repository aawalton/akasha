import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const castleSeason3 = {
  id: "01a06802-b8b8-7027-b4dd-6f92a8a3df23",
  type: "page-type/season",
  slug: "castle-season-3",
  title: "Castle Season 3",
  partOfCollections: ["show/castle"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2010-09-21",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4091",
      externalLink: "https://trakt.tv/shows/castle/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
  progressedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Season
