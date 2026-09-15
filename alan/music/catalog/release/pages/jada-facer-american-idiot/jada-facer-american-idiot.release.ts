import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerAmericanIdiot = {
  id: "01a0676a-d717-7002-95a5-a01358e73d90",
  type: "page-type/release",
  slug: "jada-facer-american-idiot",
  title: "American Idiot",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 2.167783,
  ownProgress: 2.167783,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-01-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "01q9RGIBLRHLrl4T0tiuqD",
      externalLink: "https://open.spotify.com/album/01q9RGIBLRHLrl4T0tiuqD",
    },
  ],
} as const satisfies Release
