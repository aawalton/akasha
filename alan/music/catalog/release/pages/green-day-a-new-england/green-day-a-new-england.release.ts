import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayANewEngland = {
  id: "01a0676a-d715-7036-bdba-ecdc26de390c",
  type: "page-type/release",
  slug: "green-day-a-new-england",
  title: "A New England",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 2.154433,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  rank: "C",
  publishedAt: "2020-11-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5AbU5XYizMzHyDeoCd2Vkc",
      externalLink: "https://open.spotify.com/album/5AbU5XYizMzHyDeoCd2Vkc",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
