import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const book2Sky = {
  id: "01a06802-b8b8-7011-b4cb-b0625bf3b5f3",
  type: "page-type/season",
  slug: "book-2-sky",
  title: "Book 2: Sky",
  partOfCollections: ["show/the-dragon-prince"],
  position: 2,
  ownLength: 241.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-02-15",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-173441",
      externalLink: "https://trakt.tv/shows/the-dragon-prince/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
