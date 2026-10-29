import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const friendsSeason2 = {
  id: "01a06802-b8ba-7005-af0f-cf70eccd6356",
  type: "page-type/season",
  slug: "friends-season-2",
  title: "Friends Season 2",
  partOfCollections: ["show/friends"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1995-09-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4976",
      externalLink: "https://trakt.tv/shows/friends/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Season
