import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioHome = {
  id: "01a0676a-d720-7050-b90e-2fddd0b19775",
  type: "page-type/release",
  slug: "jessica-baio-home",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2021-07-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "15SQweqZr9AEoXOfGhIKmr",
      externalLink: "https://open.spotify.com/album/15SQweqZr9AEoXOfGhIKmr",
    },
  ],
  title: "home",
} as const satisfies Release
