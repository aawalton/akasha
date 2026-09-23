import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LoverTheArcher = {
  id: "01a0ce86-6e77-70a0-9b2e-85c22b96ab46",
  type: "page-type/track",
  slug: "taylor-swift-2-lover-the-archer",
  ownLength: 3.5206666666666666,
  ownProgress: 3.5206666666666666,
  partOfCollections: ["release/taylor-swift-2-lover"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Archer",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "thearcher|06HL4z0CvFAxyc27GXpf02|211240",
  song: "song/taylor-swift-the-archer",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lover",
      discNumber: 1,
      position: 5,
      externalId: "3pHkh7d0lzM2AldUtz2x37",
      externalLink: "https://open.spotify.com/track/3pHkh7d0lzM2AldUtz2x37",
    },
  ],
} as const satisfies Track
