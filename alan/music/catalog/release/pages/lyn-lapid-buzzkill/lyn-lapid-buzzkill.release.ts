import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidBuzzkill = {
  id: "01a0676a-d719-704c-b9cb-cfdf3a71df48",
  type: "page-type/release",
  slug: "lyn-lapid-buzzkill",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2025-04-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "41oBhRyeuyMHkVdp2LYVJE",
      externalLink: "https://open.spotify.com/album/41oBhRyeuyMHkVdp2LYVJE",
    },
  ],
  title: "BUZZKILL",
} as const satisfies Release
