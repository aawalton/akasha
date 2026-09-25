import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const doctorWhoSpecials = {
  id: "01a06802-b8b9-7026-bc4c-09f8913c1811",
  type: "page-type/season",
  slug: "doctor-who-specials",
  title: "Doctor Who Specials",
  partOfCollections: ["show/doctor-who-1963-1989"],
  position: 0,
  ownLength: 14920.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "1954-03-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-420",
      externalLink: "https://trakt.tv/shows/doctor-who/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
