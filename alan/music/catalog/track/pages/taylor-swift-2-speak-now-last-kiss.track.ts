import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowLastKiss = {
  id: "01a0ce86-8b60-746a-9307-99a8851931fb",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-last-kiss",
  ownLength: 6.118883333333334,
  ownProgress: 0,
  partOfCollections: [
    "release/taylor-swift-2-speak-now",
    "release/taylor-swift-2-speak-now-deluxe-edition",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Last Kiss",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "lastkiss|06HL4z0CvFAxyc27GXpf02|367133",
  song: "song/taylor-swift-last-kiss",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now",
      discNumber: 1,
      position: 13,
      externalId: "4h0EXpatqJImv4VRgvX6po",
      externalLink: "https://open.spotify.com/track/4h0EXpatqJImv4VRgvX6po",
    },
    {
      release: "release/taylor-swift-2-speak-now-deluxe-edition",
      discNumber: 1,
      position: 13,
      externalId: "1D27z8xNzjW0Mwwt1NCWhJ",
      externalLink: "https://open.spotify.com/track/1D27z8xNzjW0Mwwt1NCWhJ",
    },
  ],
} as const satisfies Track
