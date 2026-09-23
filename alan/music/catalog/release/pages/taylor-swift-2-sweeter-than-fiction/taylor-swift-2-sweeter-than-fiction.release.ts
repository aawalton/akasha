import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2SweeterThanFiction = {
  id: "01a0676a-d72b-7004-9054-14df53084c5a",
  type: "page-type/release",
  slug: "taylor-swift-2-sweeter-than-fiction",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2013-10-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "11e4xCXllbvk8pWc1cCas1",
      externalLink: "https://open.spotify.com/album/11e4xCXllbvk8pWc1cCas1",
    },
  ],
  title: "Sweeter Than Fiction",
} as const satisfies Release
