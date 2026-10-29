import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const childrenOfEarth = {
  id: "01a06802-b8b8-702d-a152-d13e31f36f8f",
  type: "page-type/season",
  slug: "children-of-earth",
  title: "Children of Earth",
  partOfCollections: ["show/torchwood"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2009-07-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-1389",
      externalLink: "https://trakt.tv/shows/torchwood/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Season
