import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const babylon5SignsAndPortents = {
  id: "01a06802-b8b7-7016-bd46-d1dfa2fd130a",
  type: "page-type/season",
  slug: "babylon-5-signs-and-portents",
  title: "Babylon 5 Signs and Portents",
  partOfCollections: ["show/babylon-5"],
  position: 1,
  ownLength: 990,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1994-01-27",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "1",
      externalLink: "https://trakt.tv/shows/babylon-5/seasons/1",
      lastSyncedAt: "2025-12-20",
    },
  ],
} as const satisfies Season
