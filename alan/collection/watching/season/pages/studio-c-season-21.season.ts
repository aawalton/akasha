import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason21 = {
  id: "01a06802-b8be-7021-b70a-4feb0d27cc2e",
  type: "page-type/season",
  slug: "studio-c-season-21",
  title: "Studio C Season 21",
  partOfCollections: ["show/studio-c"],
  position: 21,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-10-14",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "21",
      externalLink: "https://trakt.tv/shows/studio-c/seasons/21",
      lastSyncedAt: "2025-12-21",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Season
