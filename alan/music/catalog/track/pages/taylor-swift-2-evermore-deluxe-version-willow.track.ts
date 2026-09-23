import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2EvermoreDeluxeVersionWillow = {
  id: "01a0ce86-a468-7fc0-98fe-f264222b9cb3",
  type: "page-type/track",
  slug: "taylor-swift-2-evermore-deluxe-version-willow",
  ownLength: 3.5784333333333334,
  ownProgress: 0,
  partOfCollections: [
    "release/taylor-swift-2-evermore-deluxe-version",
    "release/taylor-swift-2-evermore",
    "release/taylor-swift-2-willow-the-witch-collection",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "willow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "willow|06HL4z0CvFAxyc27GXpf02|214706",
  song: "song/taylor-swift-willow",
  carriedBy: [
    {
      release: "release/taylor-swift-2-evermore",
      discNumber: 1,
      position: 1,
      externalId: "0lx2cLdOt3piJbcaXIV74f",
      externalLink: "https://open.spotify.com/track/0lx2cLdOt3piJbcaXIV74f",
    },
    {
      release: "release/taylor-swift-2-evermore-deluxe-version",
      discNumber: 1,
      position: 1,
      externalId: "2gVhfX2Gy1T9kDuS9azrF7",
      externalLink: "https://open.spotify.com/track/2gVhfX2Gy1T9kDuS9azrF7",
    },
    {
      release: "release/taylor-swift-2-willow-the-witch-collection",
      discNumber: 1,
      position: 1,
      externalId: "3yk94DUDanXyVhRLVjmI3w",
      externalLink: "https://open.spotify.com/track/3yk94DUDanXyVhRLVjmI3w",
    },
  ],
} as const satisfies Track
