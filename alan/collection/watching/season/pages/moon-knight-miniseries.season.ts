import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const moonKnightMiniseries = {
  id: "01a06802-b8bb-7005-b0fe-0156ab9ca107",
  type: "page-type/season",
  slug: "moon-knight-miniseries",
  title: "Moon Knight Miniseries",
  partOfCollections: ["show/moon-knight"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-03-30",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-240814",
      externalLink: "https://trakt.tv/shows/moon-knight/seasons/1",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T16:29:36.924Z",
  progressedAt: "2026-10-29T16:29:36.924Z",
} as const satisfies Season
