import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessPlatinumEditionFifteen = {
  id: "01a0ce86-9237-7f63-b260-35d01d49d3bf",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-platinum-edition-fifteen",
  ownLength: 4.905766666666667,
  ownProgress: 4.905766666666667,
  partOfCollections: ["release/taylor-swift-2-fearless-platinum-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Fifteen",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "fifteen|06HL4z0CvFAxyc27GXpf02|294346",
  song: "song/taylor-swift-fifteen",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless-platinum-edition",
      discNumber: 1,
      position: 8,
      externalId: "3M0w3fhdXByHLCNAoi5c9G",
      externalLink: "https://open.spotify.com/track/3M0w3fhdXByHLCNAoi5c9G",
    },
  ],
} as const satisfies Track
