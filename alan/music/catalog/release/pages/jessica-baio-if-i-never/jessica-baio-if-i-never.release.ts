import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioIfINever = {
  id: "01a0676a-d721-7053-b5b8-cb0744098f1c",
  type: "page-type/release",
  slug: "jessica-baio-if-i-never",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2021-01-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Gtzth9vu9GbratScKOjkt",
      externalLink: "https://open.spotify.com/album/2Gtzth9vu9GbratScKOjkt",
    },
  ],
  title: "if i never",
} as const satisfies Release
