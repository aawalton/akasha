import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2ReputationGetawayCar = {
  id: "01a0ce86-73f8-7c04-ac36-99cbdc0621f9",
  type: "page-type/track",
  slug: "taylor-swift-2-reputation-getaway-car",
  ownLength: 3.8937666666666666,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-reputation"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Getaway Car",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "getawaycar|06HL4z0CvFAxyc27GXpf02|233626",
  song: "song/taylor-swift-getaway-car",
  carriedBy: [
    {
      release: "release/taylor-swift-2-reputation",
      discNumber: 1,
      position: 9,
      externalId: "0VE4kBnHJUgtMf0dy6DRmW",
      externalLink: "https://open.spotify.com/track/0VE4kBnHJUgtMf0dy6DRmW",
    },
  ],
} as const satisfies Track
