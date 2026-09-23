import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2ChristmasTreeFarm = {
  id: "01a0676a-d71a-7044-9b3c-e111be33f877",
  type: "page-type/release",
  slug: "taylor-swift-2-christmas-tree-farm",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2021-11-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2jEFKhESvCLGpFP8KwpV2T",
      externalLink: "https://open.spotify.com/album/2jEFKhESvCLGpFP8KwpV2T",
    },
  ],
  title: "Christmas Tree Farm",
} as const satisfies Release
