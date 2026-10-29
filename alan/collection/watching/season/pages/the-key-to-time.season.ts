import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theKeyToTime = {
  id: "01a06802-b8bf-7011-9802-c7fe93ca0df8",
  type: "page-type/season",
  slug: "the-key-to-time",
  title: "The Key to Time",
  partOfCollections: ["show/doctor-who-1963-1989"],
  position: 16,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1978-09-02",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-436",
      externalLink: "https://trakt.tv/shows/doctor-who/seasons/16",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T15:28:51.952Z",
} as const satisfies Season
