import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2EvermoreDeluxeVersionLongStoryShort = {
  id: "01a0ce86-601c-7439-b216-9107ee5a35fc",
  type: "page-type/track",
  slug: "taylor-swift-2-evermore-deluxe-version-long-story-short",
  ownLength: 3.5986666666666665,
  ownProgress: 3.5986666666666665,
  partOfCollections: [
    "release/taylor-swift-2-evermore-deluxe-version",
    "release/taylor-swift-2-evermore",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "long story short",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "longstoryshort|06HL4z0CvFAxyc27GXpf02|215920",
  song: "song/taylor-swift-long-story-short",
  carriedBy: [
    {
      release: "release/taylor-swift-2-evermore",
      discNumber: 1,
      position: 12,
      externalId: "2o2sgVJIgFXk8GQjWTgI6U",
      externalLink: "https://open.spotify.com/track/2o2sgVJIgFXk8GQjWTgI6U",
    },
    {
      release: "release/taylor-swift-2-evermore-deluxe-version",
      discNumber: 1,
      position: 12,
      externalId: "5VYWxXUpxuxEmCqMLDqICo",
      externalLink: "https://open.spotify.com/track/5VYWxXUpxuxEmCqMLDqICo",
    },
  ],
} as const satisfies Track
