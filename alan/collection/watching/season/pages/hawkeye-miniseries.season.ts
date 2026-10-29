import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const hawkeyeMiniseries = {
  id: "01a06802-b8ba-7023-ad8c-2bc62d512325",
  type: "page-type/season",
  slug: "hawkeye-miniseries",
  title: "Hawkeye Miniseries",
  partOfCollections: ["show/hawkeye"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-11-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-239912",
      externalLink: "https://trakt.tv/shows/hawkeye-2021/seasons/1",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T16:29:26.300Z",
  progressedAt: "2026-10-29T16:29:26.300Z",
} as const satisfies Season
