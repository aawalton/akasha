import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const wandavisionSpecials = {
  id: "01a06802-b8c0-700f-b630-9d1ea3f0dc87",
  type: "page-type/season",
  slug: "wandavision-specials",
  title: "WandaVision Specials",
  partOfCollections: ["show/wandavision"],
  position: 0,
  ownLength: 10.2,
  ownProgress: 10.2,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2023-11-28",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-435083",
      externalLink: "https://trakt.tv/shows/wandavision/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.968Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
