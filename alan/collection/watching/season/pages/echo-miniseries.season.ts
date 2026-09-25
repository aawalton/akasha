import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const echoMiniseries = {
  id: "01a06802-b8b9-7032-91cb-4e057707851b",
  type: "page-type/season",
  slug: "echo-miniseries",
  title: "Echo Miniseries",
  partOfCollections: ["show/echo"],
  position: 1,
  ownLength: 213,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-01-10",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-255625",
      externalLink: "https://trakt.tv/shows/echo/seasons/1",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
