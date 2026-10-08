import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theOfficeSpecials = {
  id: "01a06802-b8bf-702d-84cd-69b9e5de9178",
  type: "page-type/season",
  slug: "the-office-specials",
  title: "The Office Specials",
  partOfCollections: ["show/the-office"],
  position: 0,
  ownLength: 2514,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2005-01-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-7608",
      externalLink: "https://trakt.tv/shows/the-office/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
