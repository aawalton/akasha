import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const severanceSpecials = {
  id: "01a06802-b8bc-7035-9f57-c43fcae6a62d",
  type: "page-type/season",
  slug: "severance-specials",
  title: "Severance Specials",
  partOfCollections: ["show/severance"],
  position: 0,
  ownLength: 7,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2021-12-16",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "0",
      externalLink: "https://trakt.tv/shows/severance/seasons/0",
      lastSyncedAt: "2026-01-03",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
