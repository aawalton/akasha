import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const yaelokreNeathTheGroveIsAHeart = {
  id: "01a0676a-d725-7043-9726-080c0147292a",
  type: "page-type/release",
  slug: "yaelokre-neath-the-grove-is-a-heart",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/yaelokre"],
  position: 0,
  publishedAt: "2024-01-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5kDMl7KFaOovhc0H9AaGDP",
      externalLink: "https://open.spotify.com/album/5kDMl7KFaOovhc0H9AaGDP",
    },
  ],
  title: "Neath the grove is a heart",
} as const satisfies Release
