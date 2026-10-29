import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const numb3rsSeason2 = {
  id: "01a06802-b8bb-703d-a1ef-62e227ead2b6",
  type: "page-type/season",
  slug: "numb3rs-season-2",
  title: "Numb3rs Season 2",
  partOfCollections: ["show/numb3rs"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2005-09-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-1954",
      externalLink: "https://trakt.tv/shows/numb3rs/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T16:29:49.843Z",
  progressedAt: "2026-10-29T16:29:49.843Z",
} as const satisfies Season
