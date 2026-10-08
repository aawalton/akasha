import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theLordOfTheRingsTheRingsOfPowerSpecials = {
  id: "01a06802-b8bf-7017-975d-12ccae4ad349",
  type: "page-type/season",
  slug: "the-lord-of-the-rings-the-rings-of-power-specials",
  title: "The Lord of the Rings: The Rings of Power Specials",
  partOfCollections: ["show/the-lord-of-the-rings-the-rings-of-power"],
  position: 0,
  ownLength: 310.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2022-09-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-304683",
      externalLink: "https://trakt.tv/shows/the-lord-of-the-rings-the-rings-of-power/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
