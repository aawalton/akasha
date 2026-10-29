import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const strangerThings2 = {
  id: "01a06802-b8be-7010-8df7-1e5f51ff3354",
  type: "page-type/season",
  slug: "stranger-things-2",
  title: "Stranger Things 2",
  partOfCollections: ["show/stranger-things"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-10-27",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-131692",
      externalLink: "https://trakt.tv/shows/stranger-things/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:44:31.505Z",
} as const satisfies Season
