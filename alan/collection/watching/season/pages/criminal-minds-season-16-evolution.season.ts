import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const criminalMindsSeason16Evolution = {
  id: "01a06802-b8b8-7039-b54f-be766a1e6d24",
  type: "page-type/season",
  slug: "criminal-minds-season-16-evolution",
  title: "Criminal Minds Season 16: Evolution",
  partOfCollections: ["show/criminal-minds"],
  position: 16,
  ownLength: 521,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-11-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "16",
      externalLink: "https://trakt.tv/shows/criminal-minds/seasons/16",
      lastSyncedAt: "2025-12-08",
    },
  ],
} as const satisfies Season
