import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TaylorSwiftColdAsYou = {
  id: "01a0ce86-95d6-78e5-a5c5-15f61ca2aef4",
  type: "page-type/track",
  slug: "taylor-swift-2-taylor-swift-cold-as-you",
  ownLength: 3.98355,
  ownProgress: 3.98355,
  partOfCollections: ["release/taylor-swift-2-taylor-swift"],
  status: "completed",
  unit: "unit/minutes",
  title: "Cold As You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "coldasyou|06HL4z0CvFAxyc27GXpf02|239013",
  song: "song/taylor-swift-cold-as-you",
  carriedBy: [
    {
      release: "release/taylor-swift-2-taylor-swift",
      discNumber: 1,
      position: 5,
      externalId: "7an1exwMnfYRcdVQm0yDev",
      externalLink: "https://open.spotify.com/track/7an1exwMnfYRcdVQm0yDev",
    },
  ],
} as const satisfies Track
