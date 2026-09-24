import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowBackToDecember = {
  id: "01a0ce86-89bd-7aa8-bad2-95bc74f62a35",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-back-to-december",
  ownLength: 4.883766666666666,
  ownProgress: 4.883766666666666,
  partOfCollections: [
    "release/taylor-swift-2-speak-now",
    "release/taylor-swift-2-speak-now-deluxe-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Back To December",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "backtodecember|06HL4z0CvFAxyc27GXpf02|293026",
  song: "song/taylor-swift-back-to-december",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now",
      discNumber: 1,
      position: 3,
      externalId: "3DrjZArsPsoqbLzUZZV1Id",
      externalLink: "https://open.spotify.com/track/3DrjZArsPsoqbLzUZZV1Id",
    },
    {
      release: "release/taylor-swift-2-speak-now-deluxe-edition",
      discNumber: 1,
      position: 3,
      externalId: "7lxADouiWFkwR7ZV2GKUcH",
      externalLink: "https://open.spotify.com/track/7lxADouiWFkwR7ZV2GKUcH",
    },
  ],
} as const satisfies Track
