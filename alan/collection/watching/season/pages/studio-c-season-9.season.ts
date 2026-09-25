import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason9 = {
  id: "01a06802-b8be-7028-9a24-d329a4846ae4",
  type: "page-type/season",
  slug: "studio-c-season-9",
  title: "Studio C Season 9",
  partOfCollections: ["show/studio-c"],
  position: 9,
  ownLength: 429,
  ownProgress: 429,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-09-11",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-171695",
      externalLink: "https://trakt.tv/shows/studio-c/seasons/9",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
