import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason16 = {
  id: "01a06802-b8be-701b-a908-15278d3b5718",
  type: "page-type/season",
  slug: "studio-c-season-16",
  title: "Studio C Season 16",
  partOfCollections: ["show/studio-c"],
  position: 16,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-10-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-339591",
      externalLink: "https://trakt.tv/shows/studio-c/seasons/16",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Season
