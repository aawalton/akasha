import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LoverLover = {
  id: "01a0ce86-6e23-7abf-8f2f-5ef8eed485de",
  type: "page-type/track",
  slug: "taylor-swift-2-lover-lover",
  ownLength: 3.6884333333333332,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-lover"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Lover",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "lover|06HL4z0CvFAxyc27GXpf02|221306",
  song: "song/taylor-swift-lover",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lover",
      discNumber: 1,
      position: 3,
      externalId: "1dGr1c8CrMLDpV6mPbImSI",
      externalLink: "https://open.spotify.com/track/1dGr1c8CrMLDpV6mPbImSI",
    },
  ],
} as const satisfies Track
