import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const aStarstruckOdyssey = {
  id: "01a06802-b8b7-7009-8242-6b84ea5a9d88",
  type: "page-type/season",
  slug: "a-starstruck-odyssey",
  title: "A Starstruck Odyssey",
  partOfCollections: ["show/dimension-20"],
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-01-13",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-284359",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/13",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.959Z",
  updatedAt: "2026-10-29T15:27:49.638Z",
} as const satisfies Season
