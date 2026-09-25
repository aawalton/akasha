import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason20 = {
  id: "01a06802-b8be-7020-a0df-3236b261ca8c",
  type: "page-type/season",
  slug: "studio-c-season-20",
  title: "Studio C Season 20",
  partOfCollections: ["show/studio-c"],
  position: 20,
  ownLength: 158,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-03-04",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "20",
      externalLink: "https://trakt.tv/shows/studio-c/seasons/20",
      lastSyncedAt: "2025-12-21",
    },
  ],
} as const satisfies Season
