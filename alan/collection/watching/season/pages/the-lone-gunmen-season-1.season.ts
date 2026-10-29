import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theLoneGunmenSeason1 = {
  id: "01a06802-b8bf-7013-801a-ebd0ad60090c",
  type: "page-type/season",
  slug: "the-lone-gunmen-season-1",
  title: "The Lone Gunmen Season 1",
  partOfCollections: ["show/the-lone-gunmen-2001"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
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
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T16:31:07.198Z",
  progressedAt: "2026-10-29T16:31:07.198Z",
} as const satisfies Season
