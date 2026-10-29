import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const numb3rsSeason1 = {
  id: "01a06802-b8bb-703c-931d-7600b9f3617f",
  type: "page-type/season",
  slug: "numb3rs-season-1",
  title: "Numb3rs Season 1",
  partOfCollections: ["show/numb3rs"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2005-01-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-1953",
      externalLink: "https://trakt.tv/shows/numb3rs/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T16:29:49.843Z",
  progressedAt: "2026-10-29T16:29:49.843Z",
} as const satisfies Season
