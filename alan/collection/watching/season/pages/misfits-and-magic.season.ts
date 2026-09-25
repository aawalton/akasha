import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const misfitsAndMagic = {
  id: "01a06802-b8bb-7003-ae35-fdd245411408",
  type: "page-type/season",
  slug: "misfits-and-magic",
  title: "Misfits and Magic",
  partOfCollections: ["show/dimension-20"],
  position: 10,
  ownLength: 586.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-06-30",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-262218",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/10",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
