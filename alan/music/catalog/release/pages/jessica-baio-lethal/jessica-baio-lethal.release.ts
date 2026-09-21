import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioLethal = {
  id: "01a0676a-d723-7028-a869-7572131004f1",
  type: "page-type/release",
  slug: "jessica-baio-lethal",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2022-11-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2pfmBpFUwF3HjmkHAD4orj",
      externalLink: "https://open.spotify.com/album/2pfmBpFUwF3HjmkHAD4orj",
    },
  ],
  title: "lethal",
} as const satisfies Release
