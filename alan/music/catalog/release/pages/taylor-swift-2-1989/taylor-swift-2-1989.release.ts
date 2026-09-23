import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift21989 = {
  id: "01a0676a-d714-7016-bfe3-9b1cac97ffb4",
  type: "page-type/release",
  slug: "taylor-swift-2-1989",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2014-10-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2QJmrSgbdM35R67eoGQo4j",
      externalLink: "https://open.spotify.com/album/2QJmrSgbdM35R67eoGQo4j",
    },
  ],
  title: "1989",
} as const satisfies Release
