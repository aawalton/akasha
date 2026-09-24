import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2ReputationLookWhatYouMadeMeDo = {
  id: "01a0ce86-7387-729c-91d5-5e25fe2c9594",
  type: "page-type/track",
  slug: "taylor-swift-2-reputation-look-what-you-made-me-do",
  ownLength: 3.530883333333333,
  ownProgress: 3.530883333333333,
  partOfCollections: ["release/taylor-swift-2-reputation"],
  status: "completed",
  unit: "unit/minutes",
  title: "Look What You Made Me Do",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "lookwhatyoumademedo|06HL4z0CvFAxyc27GXpf02|211853",
  song: "song/taylor-swift-look-what-you-made-me-do",
  carriedBy: [
    {
      release: "release/taylor-swift-2-reputation",
      discNumber: 1,
      position: 6,
      externalId: "1P17dC1amhFzptugyAO7Il",
      externalLink: "https://open.spotify.com/track/1P17dC1amhFzptugyAO7Il",
    },
  ],
} as const satisfies Track
