import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const book4Earth = {
  id: "01a06802-b8b8-7013-9302-c231363be0cb",
  type: "page-type/season",
  slug: "book-4-earth",
  title: "Book 4: Earth",
  partOfCollections: ["show/the-dragon-prince"],
  position: 4,
  ownLength: 253.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-11-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-303508",
      externalLink: "https://trakt.tv/shows/the-dragon-prince/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
