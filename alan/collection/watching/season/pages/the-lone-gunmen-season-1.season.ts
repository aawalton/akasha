import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theLoneGunmenSeason1 = {
  id: "01a06802-b8bf-7013-801a-ebd0ad60090c",
  type: "page-type/season",
  slug: "the-lone-gunmen-season-1",
  title: "The Lone Gunmen Season 1",
  partOfCollections: ["show/the-lone-gunmen-2001"],
  position: 1,
  ownLength: 585,
  ownProgress: 585,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2001-03-05",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "1",
      externalLink: "https://trakt.tv/shows/the-lone-gunmen/seasons/1",
      lastSyncedAt: "2025-10-22",
    },
  ],
} as const satisfies Season
