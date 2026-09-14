import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const taylorSwift2ChristmasTreeFarm = {
  id: "01a0676a-d71a-7044-9b3c-e111be33f877",
  type: "release",
  slug: "taylor-swift-2-christmas-tree-farm",
  title: "Christmas Tree Farm",
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  ownLength: 11.908417,
  ownProgress: 11.908417,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-11-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2jEFKhESvCLGpFP8KwpV2T",
      externalLink: "https://open.spotify.com/album/2jEFKhESvCLGpFP8KwpV2T",
    },
  ],
} as const satisfies Release
