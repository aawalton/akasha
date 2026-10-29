import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const fantasyHigh = {
  id: "01a06802-b8b9-7044-ad65-48648f25fa91",
  type: "page-type/season",
  slug: "fantasy-high",
  title: "Fantasy High",
  partOfCollections: ["show/dimension-20"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-09-19",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-174127",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.961Z",
  updatedAt: "2026-10-29T15:27:49.638Z",
} as const satisfies Season
