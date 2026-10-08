import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theLoneGunmenSpecials = {
  id: "01a06802-b8bf-7014-ad38-f2cca21b5ba0",
  type: "page-type/season",
  slug: "the-lone-gunmen-specials",
  title: "The Lone Gunmen Specials",
  partOfCollections: ["show/the-lone-gunmen-2001"],
  position: 0,
  ownLength: 90,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2002-04-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "0",
      externalLink: "https://trakt.tv/shows/the-lone-gunmen/seasons/0",
      lastSyncedAt: "2025-10-22",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
