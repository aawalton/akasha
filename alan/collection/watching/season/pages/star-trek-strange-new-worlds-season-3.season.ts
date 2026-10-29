import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekStrangeNewWorldsSeason3 = {
  id: "01a06802-b8bd-7017-8754-0a98f95ac489",
  type: "page-type/season",
  slug: "star-trek-strange-new-worlds-season-3",
  title: "Star Trek: Strange New Worlds Season 3",
  partOfCollections: ["show/star-trek-strange-new-worlds"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-07-17",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-strange-new-worlds/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-10-29T15:42:00.517Z",
} as const satisfies Season
