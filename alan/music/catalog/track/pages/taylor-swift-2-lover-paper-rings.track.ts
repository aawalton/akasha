import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LoverPaperRings = {
  id: "01a0ce86-6ef4-7d6e-8f47-34db59ac774c",
  type: "page-type/track",
  slug: "taylor-swift-2-lover-paper-rings",
  ownLength: 3.7066666666666666,
  ownProgress: 3.7066666666666666,
  partOfCollections: ["release/taylor-swift-2-lover"],
  status: "completed",
  unit: "unit/minutes",
  title: "Paper Rings",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "paperrings|06HL4z0CvFAxyc27GXpf02|222400",
  song: "song/taylor-swift-paper-rings",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lover",
      discNumber: 1,
      position: 8,
      externalId: "4y5bvROuBDPr5fuwXbIBZR",
      externalLink: "https://open.spotify.com/track/4y5bvROuBDPr5fuwXbIBZR",
    },
  ],
} as const satisfies Track
