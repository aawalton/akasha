import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2LoverLiveFromParis = {
  id: "01a0676a-d724-700b-a96e-7f7f9571e978",
  type: "page-type/release",
  slug: "taylor-swift-2-lover-live-from-paris",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2020-05-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7hvsmGyWH2kJS5X4E4t039",
      externalLink: "https://open.spotify.com/album/7hvsmGyWH2kJS5X4E4t039",
    },
  ],
  title: "Lover (Live From Paris)",
} as const satisfies Release
