import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowMine = {
  id: "01a0ce86-896d-701b-be46-450ef7ebd8d8",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-mine",
  ownLength: 3.8451,
  ownProgress: 3.8451,
  partOfCollections: [
    "release/taylor-swift-2-speak-now",
    "release/taylor-swift-2-speak-now-deluxe-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Mine",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "mine|06HL4z0CvFAxyc27GXpf02|230706",
  song: "song/taylor-swift-mine",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now",
      discNumber: 1,
      position: 1,
      externalId: "0dBW6ZsW8skfvoRfgeerBF",
      externalLink: "https://open.spotify.com/track/0dBW6ZsW8skfvoRfgeerBF",
    },
    {
      release: "release/taylor-swift-2-speak-now-deluxe-edition",
      discNumber: 1,
      position: 1,
      externalId: "6LZaxlycSWrJZ4Volb25qx",
      externalLink: "https://open.spotify.com/track/6LZaxlycSWrJZ4Volb25qx",
    },
  ],
} as const satisfies Track
