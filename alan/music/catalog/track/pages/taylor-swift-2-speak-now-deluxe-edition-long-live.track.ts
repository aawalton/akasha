import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowDeluxeEditionLongLive = {
  id: "01a0ce86-8b8a-7e29-a7df-ce526a85b67a",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-deluxe-edition-long-live",
  ownLength: 5.290883333333333,
  ownProgress: 5.290883333333333,
  partOfCollections: ["release/taylor-swift-2-speak-now-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Long Live",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "longlive|06HL4z0CvFAxyc27GXpf02|317453",
  song: "song/taylor-swift-long-live",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now-deluxe-edition",
      discNumber: 1,
      position: 14,
      externalId: "7DjCRhhFo9PPzca1BjMLcf",
      externalLink: "https://open.spotify.com/track/7DjCRhhFo9PPzca1BjMLcf",
    },
  ],
} as const satisfies Track
