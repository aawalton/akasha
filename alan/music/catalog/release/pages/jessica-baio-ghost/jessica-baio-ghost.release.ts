import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioGhost = {
  id: "01a0676a-d71e-7057-8a83-ca5de02ceceb",
  type: "page-type/release",
  slug: "jessica-baio-ghost",
  title: "ghost",
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  ownLength: 10.290533,
  ownProgress: 10.290533,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2023-10-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4YTP4MQzeigSP2l9asDz0r",
      externalLink: "https://open.spotify.com/album/4YTP4MQzeigSP2l9asDz0r",
    },
  ],
} as const satisfies Release
