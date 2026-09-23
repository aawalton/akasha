import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessPlatinumEditionWhiteHorse = {
  id: "01a0ce86-92af-792c-bb44-1984eea25bf8",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-platinum-edition-white-horse",
  ownLength: 3.9073333333333333,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-fearless-platinum-edition"],
  status: "not-started",
  unit: "unit/minutes",
  title: "White Horse",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "whitehorse|06HL4z0CvFAxyc27GXpf02|234440",
  song: "song/taylor-swift-white-horse",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless-platinum-edition",
      discNumber: 1,
      position: 11,
      externalId: "4jPtq9shRdUv8Zjr0a5xkD",
      externalLink: "https://open.spotify.com/track/4jPtq9shRdUv8Zjr0a5xkD",
    },
  ],
} as const satisfies Track
