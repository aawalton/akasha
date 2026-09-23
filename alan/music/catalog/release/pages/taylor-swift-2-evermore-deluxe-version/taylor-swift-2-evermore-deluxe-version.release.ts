import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2EvermoreDeluxeVersion = {
  id: "01a0676a-d71d-7031-a901-84f461aa5045",
  type: "page-type/release",
  slug: "taylor-swift-2-evermore-deluxe-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2021-01-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6AORtDjduMM3bupSWzbTSG",
      externalLink: "https://open.spotify.com/album/6AORtDjduMM3bupSWzbTSG",
    },
  ],
  title: "evermore (deluxe version)",
} as const satisfies Release
