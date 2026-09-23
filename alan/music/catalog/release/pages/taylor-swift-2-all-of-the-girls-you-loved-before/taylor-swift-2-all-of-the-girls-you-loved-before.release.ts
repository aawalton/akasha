import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2AllOfTheGirlsYouLovedBefore = {
  id: "01a0676a-d716-7023-83ae-68477b1dd9ea",
  type: "page-type/release",
  slug: "taylor-swift-2-all-of-the-girls-you-loved-before",
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
      externalId: "1Uauz6ql2dIPvIOH4JiuhD",
      externalLink: "https://open.spotify.com/album/1Uauz6ql2dIPvIOH4JiuhD",
    },
  ],
  title: "All Of The Girls You Loved Before",
} as const satisfies Release
