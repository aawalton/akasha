import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedAllTooWell = {
  id: "01a0ce86-8471-7e91-a80e-c0440e9f215c",
  type: "page-type/track",
  slug: "taylor-swift-2-red-all-too-well",
  ownLength: 5.464883333333334,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-red", "release/taylor-swift-2-red-deluxe-edition"],
  status: "not-started",
  unit: "unit/minutes",
  title: "All Too Well",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "alltoowell|06HL4z0CvFAxyc27GXpf02|327893",
  song: "song/taylor-swift-all-too-well",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red",
      discNumber: 1,
      position: 5,
      externalId: "4XMP3zVxrnr58T0tjIHvpR",
      externalLink: "https://open.spotify.com/track/4XMP3zVxrnr58T0tjIHvpR",
    },
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 5,
      externalId: "1q3RiD1tIWUpGsNFADMlvl",
      externalLink: "https://open.spotify.com/track/1q3RiD1tIWUpGsNFADMlvl",
    },
  ],
} as const satisfies Track
