import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2TaylorSwift = {
  id: "01a0676a-d72c-7004-aa96-67c96605d39d",
  type: "page-type/release",
  slug: "taylor-swift-2-taylor-swift",
  title: "Taylor Swift",
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  ownLength: 53.492783,
  ownProgress: 53.492783,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2006-10-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7mzrIsaAjnXihW3InKjlC3",
      externalLink: "https://open.spotify.com/album/7mzrIsaAjnXihW3InKjlC3",
    },
  ],
} as const satisfies Release
