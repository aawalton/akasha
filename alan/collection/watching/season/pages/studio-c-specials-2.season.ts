import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSpecials2 = {
  id: "01a06802-b8be-702a-a6de-98e22cd19e92",
  type: "page-type/season",
  slug: "studio-c-specials-2",
  title: "Studio C Specials",
  partOfCollections: ["show/studio-c"],
  position: 0,
  ownLength: 200,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2013-10-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "0",
      externalLink: "https://trakt.tv/shows/studio-c/seasons/0",
      lastSyncedAt: "2025-12-21",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
