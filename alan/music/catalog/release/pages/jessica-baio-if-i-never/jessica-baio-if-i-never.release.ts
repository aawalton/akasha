import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioIfINever = {
  id: "01a0676a-d721-7053-b5b8-cb0744098f1c",
  type: "release",
  slug: "jessica-baio-if-i-never",
  title: "if i never",
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  ownLength: 2.937467,
  ownProgress: 2.937467,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2021-01-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Gtzth9vu9GbratScKOjkt",
      externalLink: "https://open.spotify.com/album/2Gtzth9vu9GbratScKOjkt",
    },
  ],
} as const satisfies Release
