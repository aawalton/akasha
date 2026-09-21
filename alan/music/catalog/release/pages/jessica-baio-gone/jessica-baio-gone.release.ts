import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioGone = {
  id: "01a0676a-d71f-701a-9a65-2e30a7fa4679",
  type: "page-type/release",
  slug: "jessica-baio-gone",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2021-08-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1MhQTiOfcUVBrLQEncYm2Y",
      externalLink: "https://open.spotify.com/album/1MhQTiOfcUVBrLQEncYm2Y",
    },
  ],
  title: "gone",
} as const satisfies Release
