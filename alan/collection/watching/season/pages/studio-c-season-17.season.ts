import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason17 = {
  id: "01a06802-b8be-701c-9621-56b839a3c439",
  type: "page-type/season",
  slug: "studio-c-season-17",
  title: "Studio C Season 17",
  partOfCollections: ["show/studio-c"],
  position: 17,
  ownLength: 184.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-10-16",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-339592",
      externalLink: "https://trakt.tv/shows/studio-c/seasons/17",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
