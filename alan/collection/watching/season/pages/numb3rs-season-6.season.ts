import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const numb3rsSeason6 = {
  id: "01a06802-b8bb-7041-8f3c-c31d317a62e1",
  type: "page-type/season",
  slug: "numb3rs-season-6",
  title: "Numb3rs Season 6",
  partOfCollections: ["show/numb3rs"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2009-09-26",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-1958",
      externalLink: "https://trakt.tv/shows/numb3rs/seasons/6",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T16:29:49.843Z",
  progressedAt: "2026-10-29T16:29:49.843Z",
} as const satisfies Season
