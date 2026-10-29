import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const bookTwoEarth = {
  id: "01a06802-b8b8-701c-9659-f13a7af6c291",
  type: "page-type/season",
  slug: "book-two-earth",
  title: "Book Two: Earth",
  partOfCollections: ["show/avatar-the-last-airbender"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2006-03-17",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-894",
      externalLink: "https://trakt.tv/shows/avatar-the-last-airbender/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-10-29T15:24:26.690Z",
} as const satisfies Season
