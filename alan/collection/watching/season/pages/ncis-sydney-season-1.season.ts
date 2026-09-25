import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisSydneySeason1 = {
  id: "01a06802-b8bb-7038-b442-ec7f2812aaa8",
  type: "page-type/season",
  slug: "ncis-sydney-season-1",
  title: "NCIS: Sydney Season 1",
  partOfCollections: ["show/ncis-sydney"],
  position: 1,
  ownLength: 348,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-11-10",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-303855",
      externalLink: "https://trakt.tv/shows/ncis-sydney/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
