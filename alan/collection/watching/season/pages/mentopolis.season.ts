import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const mentopolis = {
  id: "01a06802-b8bb-7000-9618-6a57fb249ac4",
  type: "page-type/season",
  slug: "mentopolis",
  title: "Mentopolis",
  partOfCollections: ["show/dimension-20"],
  position: 19,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-08-09",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-329383",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/19",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:27:49.638Z",
} as const satisfies Season
