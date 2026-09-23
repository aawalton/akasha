import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowDeluxeEditionMinePopMix = {
  id: "01a0ce86-8c70-7dbc-b41d-fa8676af575b",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-deluxe-edition-mine-pop-mix",
  ownLength: 3.8388833333333334,
  ownProgress: 3.8388833333333334,
  partOfCollections: ["release/taylor-swift-2-speak-now-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Mine - POP Mix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "minepopmix|06HL4z0CvFAxyc27GXpf02|230333",
  song: "song/taylor-swift-mine",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now-deluxe-edition",
      discNumber: 1,
      position: 20,
      externalId: "0fAbfDiuQiUwV7FUcFfRGY",
      externalLink: "https://open.spotify.com/track/0fAbfDiuQiUwV7FUcFfRGY",
    },
  ],
} as const satisfies Track
