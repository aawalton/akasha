import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSpecials2 = {
  id: "01a06802-b8b9-7027-826c-fe7c37d7d8d9",
  type: "page-type/season",
  slug: "doctor-who-specials-2",
  title: "Doctor Who Specials",
  partOfCollections: ["show/doctor-who-2005"],
  position: 0,
  ownLength: 4606.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2005-11-18",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-60079",
      externalLink: "https://trakt.tv/shows/doctor-who-2005/seasons/0",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies Season
