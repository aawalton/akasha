import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const castleSeason8 = {
  id: "01a06802-b8b8-702c-a942-36faefd16b2a",
  type: "page-type/season",
  slug: "castle-season-8",
  title: "Castle Season 8",
  partOfCollections: ["show/castle"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-09-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-112189",
      externalLink: "https://trakt.tv/shows/castle/seasons/8",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
  progressedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Season
