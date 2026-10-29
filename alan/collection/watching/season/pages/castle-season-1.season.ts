import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const castleSeason1 = {
  id: "01a06802-b8b8-7025-8c2f-79d3e3419549",
  type: "page-type/season",
  slug: "castle-season-1",
  title: "Castle Season 1",
  partOfCollections: ["show/castle"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2009-03-10",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4089",
      externalLink: "https://trakt.tv/shows/castle/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
  progressedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Season
