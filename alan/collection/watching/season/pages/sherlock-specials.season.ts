import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const sherlockSpecials = {
  id: "01a06802-b8bc-703d-b3fb-60cfe763e022",
  type: "page-type/season",
  slug: "sherlock-specials",
  title: "Sherlock Specials",
  partOfCollections: ["show/sherlock"],
  position: 0,
  ownLength: 367.8,
  ownProgress: 367.8,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2010-08-30",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-30834",
      externalLink: "https://trakt.tv/shows/sherlock/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
