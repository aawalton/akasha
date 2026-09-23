import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2Lover = {
  id: "01a0676a-d724-7009-8407-b0b45d1317f6",
  type: "page-type/release",
  slug: "taylor-swift-2-lover",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2019-08-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1NAmidJlEaVgA3MpcPFYGq",
      externalLink: "https://open.spotify.com/album/1NAmidJlEaVgA3MpcPFYGq",
    },
  ],
  title: "Lover",
} as const satisfies Release
