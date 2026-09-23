import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LoverFalseGod = {
  id: "01a0ce86-6fc3-7d35-8052-a9001b517934",
  type: "page-type/track",
  slug: "taylor-swift-2-lover-false-god",
  ownLength: 3.338433333333333,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-lover"],
  status: "not-started",
  unit: "unit/minutes",
  title: "False God",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "falsegod|06HL4z0CvFAxyc27GXpf02|200306",
  song: "song/taylor-swift-false-god",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lover",
      discNumber: 1,
      position: 13,
      externalId: "5hQSXkFgbxjZo9uCwd11so",
      externalLink: "https://open.spotify.com/track/5hQSXkFgbxjZo9uCwd11so",
    },
  ],
} as const satisfies Track
