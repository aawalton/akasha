import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const book5Ocean = {
  id: "01a06802-b8b8-7014-b398-ac5159b19914",
  type: "page-type/season",
  slug: "book-5-ocean",
  title: "Book 5: Ocean",
  partOfCollections: ["show/the-dragon-prince"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-07-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-327596",
      externalLink: "https://trakt.tv/shows/the-dragon-prince/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:46:02.330Z",
} as const satisfies Season
