import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2Evermore = {
  id: "01a0676a-d71d-7030-8b70-a23295004b6f",
  type: "page-type/release",
  slug: "taylor-swift-2-evermore",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2020-12-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Xoteh7uEpea4TohMxjtaq",
      externalLink: "https://open.spotify.com/album/2Xoteh7uEpea4TohMxjtaq",
    },
  ],
  title: "evermore",
} as const satisfies Release
