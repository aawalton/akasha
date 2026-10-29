import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const book3Sun = {
  id: "01a06802-b8b8-7012-bf49-93df5cf5645c",
  type: "page-type/season",
  slug: "book-3-sun",
  title: "Book 3: Sun",
  partOfCollections: ["show/the-dragon-prince"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-11-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-201542",
      externalLink: "https://trakt.tv/shows/the-dragon-prince/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:46:02.330Z",
} as const satisfies Season
