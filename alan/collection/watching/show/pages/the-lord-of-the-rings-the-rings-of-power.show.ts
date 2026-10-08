import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theLordOfTheRingsTheRingsOfPower = {
  id: "01a06802-9332-704b-8bd3-6d3b47c20b4f",
  type: "page-type/show",
  slug: "the-lord-of-the-rings-the-rings-of-power",
  title: "The Lord of the Rings: The Rings of Power",
  partOfCollections: ["show-collection/the-lord-of-the-rings-shows"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-09-01",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/the-lord-of-the-rings-the-rings-of-power",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Show
