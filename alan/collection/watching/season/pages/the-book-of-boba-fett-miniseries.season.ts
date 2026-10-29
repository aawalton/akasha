import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theBookOfBobaFettMiniseries = {
  id: "01a06802-b8bf-7003-8b63-6f2b290bb08c",
  type: "page-type/season",
  slug: "the-book-of-boba-fett-miniseries",
  title: "The Book of Boba Fett Miniseries",
  partOfCollections: ["show/the-book-of-boba-fett"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-12-29",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-237250",
      externalLink: "https://trakt.tv/shows/the-book-of-boba-fett/seasons/1",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T15:45:27.057Z",
} as const satisfies Season
