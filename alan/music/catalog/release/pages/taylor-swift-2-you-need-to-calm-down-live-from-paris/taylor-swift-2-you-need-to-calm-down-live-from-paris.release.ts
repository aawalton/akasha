import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2YouNeedToCalmDownLiveFromParis = {
  id: "01a0676a-d732-7011-bdab-05648dc72c88",
  type: "page-type/release",
  slug: "taylor-swift-2-you-need-to-calm-down-live-from-paris",
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
      externalId: "1w1zVWd1JmsqAgfCw117Ra",
      externalLink: "https://open.spotify.com/album/1w1zVWd1JmsqAgfCw117Ra",
    },
  ],
  title: "You Need To Calm Down (Live From Paris)",
} as const satisfies Release
