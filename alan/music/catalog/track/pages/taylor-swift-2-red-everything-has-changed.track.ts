import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedEverythingHasChanged = {
  id: "01a0ce86-85d6-7bff-8d7d-a40e60f71170",
  type: "page-type/track",
  slug: "taylor-swift-2-red-everything-has-changed",
  ownLength: 4.06555,
  ownProgress: 4.06555,
  partOfCollections: ["release/taylor-swift-2-red", "release/taylor-swift-2-red-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Everything Has Changed",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }, { artistName: "Ed Sheeran" }],
  trackKey: "everythinghaschanged|06HL4z0CvFAxyc27GXpf02,6eUKZXaKkcviH0Ku9w2n3V|243933",
  song: "song/taylor-swift-everything-has-changed",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red",
      discNumber: 1,
      position: 14,
      externalId: "4NAmRvqSITAAzKWnC8yRq3",
      externalLink: "https://open.spotify.com/track/4NAmRvqSITAAzKWnC8yRq3",
    },
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 14,
      externalId: "7gdwoOmi258QJq0hmQ4hto",
      externalLink: "https://open.spotify.com/track/7gdwoOmi258QJq0hmQ4hto",
    },
  ],
} as const satisfies Track
