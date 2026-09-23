import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LoverYouNeedToCalmDown = {
  id: "01a0ce86-6fec-7971-b530-1c095e956355",
  type: "page-type/track",
  slug: "taylor-swift-2-lover-you-need-to-calm-down",
  ownLength: 2.856,
  ownProgress: 2.856,
  partOfCollections: ["release/taylor-swift-2-lover"],
  status: "completed",
  unit: "unit/minutes",
  title: "You Need To Calm Down",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "youneedtocalmdown|06HL4z0CvFAxyc27GXpf02|171360",
  song: "song/taylor-swift-you-need-to-calm-down",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lover",
      discNumber: 1,
      position: 14,
      externalId: "6RRNNciQGZEXnqk8SQ9yv5",
      externalLink: "https://open.spotify.com/track/6RRNNciQGZEXnqk8SQ9yv5",
    },
  ],
} as const satisfies Track
