import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const numb3rsSeason3 = {
  id: "01a06802-b8bb-703e-8780-417c81135766",
  type: "page-type/season",
  slug: "numb3rs-season-3",
  title: "Numb3rs Season 3",
  partOfCollections: ["show/numb3rs"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2006-09-23",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-1955",
      externalLink: "https://trakt.tv/shows/numb3rs/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T16:29:49.843Z",
  progressedAt: "2026-10-29T16:29:49.843Z",
} as const satisfies Season
