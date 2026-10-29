import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const neverafter = {
  id: "01a06802-b8bb-703b-9616-86ea86b72fa5",
  type: "page-type/season",
  slug: "neverafter",
  title: "Neverafter",
  partOfCollections: ["show/dimension-20"],
  position: 16,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-12-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-307861",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/16",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:27:49.638Z",
} as const satisfies Season
