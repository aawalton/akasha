import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const bookOneWater = {
  id: "01a06802-b8b8-7019-99bd-122d30ad6616",
  type: "page-type/season",
  slug: "book-one-water",
  title: "Book One: Water",
  partOfCollections: ["show/avatar-the-last-airbender"],
  position: 1,
  ownLength: 487.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2005-02-21",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-893",
      externalLink: "https://trakt.tv/shows/avatar-the-last-airbender/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
