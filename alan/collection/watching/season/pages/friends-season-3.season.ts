import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const friendsSeason3 = {
  id: "01a06802-b8ba-7006-8b1f-e3e93893ac83",
  type: "page-type/season",
  slug: "friends-season-3",
  title: "Friends Season 3",
  partOfCollections: ["show/friends"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1996-09-17",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4977",
      externalLink: "https://trakt.tv/shows/friends/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Season
