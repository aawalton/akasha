import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowDeluxeEditionOurs = {
  id: "01a0ce86-8bb0-73d5-af96-1e1bf77dec42",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-deluxe-edition-ours",
  ownLength: 3.965333333333333,
  ownProgress: 3.965333333333333,
  partOfCollections: ["release/taylor-swift-2-speak-now-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ours",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "ours|06HL4z0CvFAxyc27GXpf02|237920",
  song: "song/taylor-swift-ours",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now-deluxe-edition",
      discNumber: 1,
      position: 15,
      externalId: "1EQn3Uc5AyUXoiPLeyCrrg",
      externalLink: "https://open.spotify.com/track/1EQn3Uc5AyUXoiPLeyCrrg",
    },
  ],
} as const satisfies Track
