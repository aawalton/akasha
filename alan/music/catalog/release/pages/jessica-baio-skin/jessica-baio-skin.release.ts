import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioSkin = {
  id: "01a0676a-d729-7016-a18c-a84b06e950fd",
  type: "page-type/release",
  slug: "jessica-baio-skin",
  grade: "A",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2021-12-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5zHfha4LJWpHoXHrr5IiTh",
      externalLink: "https://open.spotify.com/album/5zHfha4LJWpHoXHrr5IiTh",
    },
  ],
  title: "skin",
} as const satisfies Release
