import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason14 = {
  id: "01a06802-b8be-7019-9e81-2b8e6640d389",
  type: "page-type/season",
  slug: "studio-c-season-14",
  title: "Studio C Season 14",
  partOfCollections: ["show/studio-c"],
  position: 14,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-09-28",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-294574",
      externalLink: "https://trakt.tv/shows/studio-c/seasons/14",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Season
