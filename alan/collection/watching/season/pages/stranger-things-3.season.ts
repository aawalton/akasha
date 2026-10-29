import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const strangerThings3 = {
  id: "01a06802-b8be-7011-ba5e-1a954b47039b",
  type: "page-type/season",
  slug: "stranger-things-3",
  title: "Stranger Things 3",
  partOfCollections: ["show/stranger-things"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-07-04",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-164416",
      externalLink: "https://trakt.tv/shows/stranger-things/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:44:31.505Z",
} as const satisfies Season
