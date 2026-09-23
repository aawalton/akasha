import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2EvermoreDeluxeVersionDorothea = {
  id: "01a0ce86-5f74-7bcb-86b6-a80c9d6927d0",
  type: "page-type/track",
  slug: "taylor-swift-2-evermore-deluxe-version-dorothea",
  ownLength: 3.764666666666667,
  ownProgress: 0,
  partOfCollections: [
    "release/taylor-swift-2-evermore-deluxe-version",
    "release/taylor-swift-2-evermore",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "dorothea",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "dorothea|06HL4z0CvFAxyc27GXpf02|225880",
  song: "song/taylor-swift-dorothea",
  carriedBy: [
    {
      release: "release/taylor-swift-2-evermore",
      discNumber: 1,
      position: 8,
      externalId: "670fUmXf4KQekzbEgaXyPA",
      externalLink: "https://open.spotify.com/track/670fUmXf4KQekzbEgaXyPA",
    },
    {
      release: "release/taylor-swift-2-evermore-deluxe-version",
      discNumber: 1,
      position: 8,
      externalId: "66tOfHVH3aUrscg8vExRV4",
      externalLink: "https://open.spotify.com/track/66tOfHVH3aUrscg8vExRV4",
    },
  ],
} as const satisfies Track
