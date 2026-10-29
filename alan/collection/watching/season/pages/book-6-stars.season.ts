import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const book6Stars = {
  id: "01a06802-b8b8-7015-836f-8744649d795c",
  type: "page-type/season",
  slug: "book-6-stars",
  title: "Book 6: Stars",
  partOfCollections: ["show/the-dragon-prince"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-07-26",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-340963",
      externalLink: "https://trakt.tv/shows/the-dragon-prince/seasons/6",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:46:02.330Z",
} as const satisfies Season
