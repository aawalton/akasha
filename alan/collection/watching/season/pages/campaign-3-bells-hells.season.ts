import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const campaign3BellsHells = {
  id: "01a06802-b8b8-7021-8322-fbddaadb8e3d",
  type: "page-type/season",
  slug: "campaign-3-bells-hells",
  title: "Campaign 3: Bells Hells",
  partOfCollections: ["show/critical-role"],
  position: 3,
  ownLength: 30499.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-10-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-275051",
      externalLink: "https://trakt.tv/shows/critical-role/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
