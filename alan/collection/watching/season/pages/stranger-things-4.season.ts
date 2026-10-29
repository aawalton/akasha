import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const strangerThings4 = {
  id: "01a06802-b8be-7012-b52c-e1f85e1859d3",
  type: "page-type/season",
  slug: "stranger-things-4",
  title: "Stranger Things 4",
  partOfCollections: ["show/stranger-things"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-05-27",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-203269",
      externalLink: "https://trakt.tv/shows/stranger-things/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:44:31.505Z",
} as const satisfies Season
