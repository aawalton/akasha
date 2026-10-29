import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const castleSeason2 = {
  id: "01a06802-b8b8-7026-8291-0457a87a3c7a",
  type: "page-type/season",
  slug: "castle-season-2",
  title: "Castle Season 2",
  partOfCollections: ["show/castle"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2009-09-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4090",
      externalLink: "https://trakt.tv/shows/castle/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
  progressedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Season
