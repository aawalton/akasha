import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theChosenSpecials = {
  id: "01a06802-b8bf-7008-976a-04d4ef428905",
  type: "page-type/season",
  slug: "the-chosen-specials",
  title: "The Chosen Specials",
  partOfCollections: ["show/the-chosen"],
  position: 0,
  ownLength: 1515,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2017-12-02",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-204072",
      externalLink: "https://trakt.tv/shows/the-chosen/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
