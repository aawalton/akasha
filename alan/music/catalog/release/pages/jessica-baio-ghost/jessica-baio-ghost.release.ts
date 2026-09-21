import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioGhost = {
  id: "01a0676a-d71e-7057-8a83-ca5de02ceceb",
  type: "page-type/release",
  slug: "jessica-baio-ghost",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2023-10-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4YTP4MQzeigSP2l9asDz0r",
      externalLink: "https://open.spotify.com/album/4YTP4MQzeigSP2l9asDz0r",
    },
  ],
  title: "ghost",
} as const satisfies Release
