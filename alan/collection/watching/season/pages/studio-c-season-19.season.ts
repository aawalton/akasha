import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason19 = {
  id: "01a06802-b8be-701e-8c9a-6309c9c151ad",
  type: "page-type/season",
  slug: "studio-c-season-19",
  title: "Studio C Season 19",
  partOfCollections: ["show/studio-c"],
  position: 19,
  ownLength: 196.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-10-15",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-417213",
      externalLink: "https://trakt.tv/shows/studio-c/seasons/19",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
