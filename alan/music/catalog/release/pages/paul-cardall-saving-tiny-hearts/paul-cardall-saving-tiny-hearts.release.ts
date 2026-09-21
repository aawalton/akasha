import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallSavingTinyHearts = {
  id: "01a0676a-d728-7046-8e35-ddda65c095ef",
  type: "page-type/release",
  slug: "paul-cardall-saving-tiny-hearts",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2014-11-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5rmINAZz8JiUVDSvktSK4v",
      externalLink: "https://open.spotify.com/album/5rmINAZz8JiUVDSvktSK4v",
    },
  ],
  title: "Saving Tiny Hearts",
} as const satisfies Release
