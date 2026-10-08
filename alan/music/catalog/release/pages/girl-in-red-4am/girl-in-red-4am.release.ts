import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const girlInRed4am = {
  id: "01a0676a-d715-700c-86a8-695aa262e8ff",
  type: "page-type/release",
  slug: "girl-in-red-4am",
  title: "4am",
  partOfCollections: ["artist/girl-in-red"],
  position: 0,
  ownLength: 1.847683,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-08-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5MBdFr25fkVqYMDCGWyvTT",
      externalLink: "https://open.spotify.com/album/5MBdFr25fkVqYMDCGWyvTT",
    },
  ],
  createdAt: "2026-09-03T13:17:30.261Z",
  updatedAt: "2026-09-15T16:35:36.000Z",
} as const satisfies Release
