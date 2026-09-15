import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallSavingTinyHearts = {
  id: "01a0676a-d728-7046-8e35-ddda65c095ef",
  type: "release",
  slug: "paul-cardall-saving-tiny-hearts",
  title: "Saving Tiny Hearts",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 53.186567,
  ownProgress: 53.186567,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-11-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5rmINAZz8JiUVDSvktSK4v",
      externalLink: "https://open.spotify.com/album/5rmINAZz8JiUVDSvktSK4v",
    },
  ],
} as const satisfies Release
