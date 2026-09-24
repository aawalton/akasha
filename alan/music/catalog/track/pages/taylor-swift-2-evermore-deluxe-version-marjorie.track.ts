import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2EvermoreDeluxeVersionMarjorie = {
  id: "01a0ce86-6041-7672-9d5d-f5144f05ab64",
  type: "page-type/track",
  slug: "taylor-swift-2-evermore-deluxe-version-marjorie",
  ownLength: 4.296216666666667,
  ownProgress: 4.296216666666667,
  partOfCollections: [
    "release/taylor-swift-2-evermore-deluxe-version",
    "release/taylor-swift-2-evermore",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "marjorie",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "marjorie|06HL4z0CvFAxyc27GXpf02|257773",
  song: "song/taylor-swift-marjorie",
  carriedBy: [
    {
      release: "release/taylor-swift-2-evermore",
      discNumber: 1,
      position: 13,
      externalId: "12ntTeqEeTg7GAVpe8Mhpl",
      externalLink: "https://open.spotify.com/track/12ntTeqEeTg7GAVpe8Mhpl",
    },
    {
      release: "release/taylor-swift-2-evermore-deluxe-version",
      discNumber: 1,
      position: 13,
      externalId: "5uICWmZTLkpEVbK22PBP6e",
      externalLink: "https://open.spotify.com/track/5uICWmZTLkpEVbK22PBP6e",
    },
  ],
} as const satisfies Track
